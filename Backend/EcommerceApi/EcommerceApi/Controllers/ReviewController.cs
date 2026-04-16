using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceApi.Data;
using EcommerceApi.DTOs;
using EcommerceApi.Models;

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

            return Ok(new
            {
                reviews,
                totalCount = reviews.Count
            });
        }
    }
}