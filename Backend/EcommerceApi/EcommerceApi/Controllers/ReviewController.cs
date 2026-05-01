using EcommerceApi.Data;
using EcommerceApi.DTOs;
using EcommerceApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EcommerceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReviewController(AppDbContext context)
        {
            _context = context;
        }

        // ─────────────────────────────────────────────────────────────
        // GET /api/review?productId=1
        // Public — anyone can read reviews
        // ─────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> GetReviews([FromQuery] int productId)
        {
            if (productId <= 0)
                return BadRequest(new { message = "productId is required" });

            var reviews = await _context.Reviews
                .Include(r => r.User)
                .Include(r => r.Product)
                .Where(r => r.ProductId == productId)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new ReviewResponseDto
                {
                    Id = r.Id,
                    Comment = r.Comment,
                    Rating = r.Rating,
                    CreatedAt = r.CreatedAt,
                    UserId = r.UserId,
                    UserName = r.User != null ? r.User.Name : "Anonymous",
                    UserImage = "/user1.jpg",
                    ProductId = r.ProductId,
                    ProductName = r.Product != null ? r.Product.Name : ""
                })
                .ToListAsync();

            return Ok(new { reviews, totalCount = reviews.Count });
        }

        // ─────────────────────────────────────────────────────────────
        // POST /api/review
        // Authenticated users can post a review
        // ─────────────────────────────────────────────────────────────
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateReview([FromBody] ReviewCreateDto dto)
        {
            if (dto.Rating < 1 || dto.Rating > 5)
                return BadRequest(new { message = "Rating must be between 1 and 5" });

            if (string.IsNullOrWhiteSpace(dto.Comment))
                return BadRequest(new { message = "Comment is required" });

            // Get userId from JWT token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Invalid token" });

            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null) return NotFound(new { message = "Product not found" });

            // Check if user already reviewed this product
            var alreadyReviewed = await _context.Reviews
                .AnyAsync(r => r.ProductId == dto.ProductId && r.UserId == userId);

            if (alreadyReviewed)
                return BadRequest(new { message = "You have already reviewed this product" });

            var review = new Review
            {
                ProductId = dto.ProductId,
                UserId = userId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            // Update product rating average and count
            await UpdateProductRating(dto.ProductId);

            return Ok(new { message = "Review submitted successfully", reviewId = review.Id });
        }

        // ─────────────────────────────────────────────────────────────
        // PATCH /api/review/{id}
        // User can edit their OWN review only
        // ─────────────────────────────────────────────────────────────
        [HttpPatch("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateReview(int id, [FromBody] ReviewUpdateDto dto)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return NotFound(new { message = "Review not found" });

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            // Only the review owner can edit it
            if (review.UserId != userId)
                return Forbid();

            if (dto.Rating.HasValue)
            {
                if (dto.Rating < 1 || dto.Rating > 5)
                    return BadRequest(new { message = "Rating must be between 1 and 5" });
                review.Rating = dto.Rating.Value;
            }

            if (!string.IsNullOrWhiteSpace(dto.Comment))
                review.Comment = dto.Comment;

            await _context.SaveChangesAsync();
            await UpdateProductRating(review.ProductId);

            return Ok(new { message = "Review updated successfully" });
        }

        // ─────────────────────────────────────────────────────────────
        // DELETE /api/review/{id}
        // User deletes their own review OR Admin deletes any review
        // ─────────────────────────────────────────────────────────────
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return NotFound(new { message = "Review not found" });

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            int.TryParse(userIdClaim, out var userId);
            bool isAdmin = User.IsInRole("Admin");

            if (!isAdmin && review.UserId != userId)
                return Forbid();

            int productId = review.ProductId;
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            await UpdateProductRating(productId);

            return Ok(new { message = "Review deleted successfully" });
        }

        // ── Helper: recalculate product rating after any review change ──
        private async Task UpdateProductRating(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return;

            var allReviews = await _context.Reviews
                .Where(r => r.ProductId == productId)
                .ToListAsync();

            product.ReviewCount = allReviews.Count;
            product.Rating = allReviews.Count > 0
                ? allReviews.Average(r => r.Rating)
                : 0;
            product.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
        }
    }

    public class ReviewUpdateDto
    {
        public decimal? Rating { get; set; }
        public string? Comment { get; set; }
    }
}