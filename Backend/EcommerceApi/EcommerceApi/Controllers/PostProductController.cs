using EcommerceApi.Data;
using EcommerceApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;

namespace EcommerceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,Seller")]
    public class PostProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostProductController(AppDbContext context)
        {
            _context = context;
        }

        // POST /api/postproduct
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateProduct(
            [FromForm] string name,
            [FromForm] string description,
            [FromForm] string category,
            [FromForm] decimal price,
            [FromForm] decimal discountedPrice,
            [FromForm] int quantity,
            [FromForm] string colors,
            [FromForm] int? brandId = null,
            [FromForm] int discountPercent = 0,
            [FromForm] string? imageUrl = null,   // ← URL input
            IFormFile? image = null)   // ← file upload
        {
            if (string.IsNullOrWhiteSpace(name))
                return BadRequest(new { msg = "Product name is required" });

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { msg = "Invalid token" });

            // Determine final image URL:
            // 1. If URL was provided → use it directly (stored in DB as-is)
            // 2. If file was uploaded → save to /wwwroot/uploads/ and store path
            // 3. Neither → null
            string? finalImageUrl = null;

            if (!string.IsNullOrWhiteSpace(imageUrl))
            {
                // URL mode — just store it directly
                finalImageUrl = imageUrl.Trim();
            }
            else if (image != null && image.Length > 0)
            {
                // File upload mode
                finalImageUrl = await SaveImageAsync(image);
            }

            // Parse colors (max 2)
            var colorList = colors
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(c => c.Trim().ToLower())
                .Distinct()
                .Take(2)
                .ToList();

            if (!colorList.Any())
                colorList.Add("black");

            // Build colorImages dictionary — both colors point to same image for now
            // Seller can update per-color images later via PATCH
            var colorImages = new Dictionary<string, string>();
            colorImages["default"] = finalImageUrl ?? "";
            foreach (var color in colorList)
                colorImages[color] = finalImageUrl ?? "";

            var product = new Product
            {
                Name = name,
                Description = description ?? "",
                Category = category,
                Price = price,
                DiscountedPrice = discountedPrice,
                DiscountPercent = discountPercent,
                Quantity = quantity,
                Colors = string.Join(",", colorList),
                ColorImages = JsonSerializer.Serialize(colorImages),
                DefaultImage = finalImageUrl,
                BrandId = brandId,
                UserId = userId,
                Rating = 0,
                ReviewCount = 0,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(new { msg = "Product posted successfully", productId = product.Id });
        }

        // PATCH /api/postproduct/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductDto dto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound(new { msg = "Product not found" });

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            int.TryParse(userIdClaim, out var userId);
            bool isAdmin = User.IsInRole("Admin");

            if (!isAdmin && product.UserId != userId)
                return Forbid();

            if (!string.IsNullOrWhiteSpace(dto.Name)) product.Name = dto.Name;
            if (!string.IsNullOrWhiteSpace(dto.Description)) product.Description = dto.Description;
            if (!string.IsNullOrWhiteSpace(dto.Category)) product.Category = dto.Category;
            if (dto.Price.HasValue) product.Price = dto.Price.Value;
            if (dto.DiscountedPrice.HasValue) product.DiscountedPrice = dto.DiscountedPrice.Value;
            if (dto.DiscountPercent.HasValue) product.DiscountPercent = dto.DiscountPercent.Value;
            if (dto.Quantity.HasValue) product.Quantity = dto.Quantity.Value;

            product.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { msg = "Product updated successfully" });
        }

        // DELETE /api/postproduct/{id}  (soft delete)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound(new { msg = "Product not found" });

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            int.TryParse(userIdClaim, out var userId);
            bool isAdmin = User.IsInRole("Admin");

            if (!isAdmin && product.UserId != userId)
                return Forbid();

            product.IsActive = false;
            product.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { msg = "Product removed" });
        }

        // GET /api/postproduct/my
        [HttpGet("my")]
        public async Task<IActionResult> GetMyProducts()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var products = await _context.Products
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new {
                    id = p.Id,
                    name = p.Name,
                    price = p.Price,
                    discountedPrice = p.DiscountedPrice,
                    isActive = p.IsActive,
                    defaultImage = p.DefaultImage,
                    category = p.Category
                })
                .ToListAsync();

            return Ok(new { products });
        }

        private async Task<string> SaveImageAsync(IFormFile image)
        {
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            Directory.CreateDirectory(folder);
            var ext = Path.GetExtension(image.FileName);
            var fileName = $"{Guid.NewGuid()}{ext}";
            var path = Path.Combine(folder, fileName);
            using var stream = new FileStream(path, FileMode.Create);
            await image.CopyToAsync(stream);
            return $"/uploads/{fileName}";
        }
    }

    public class UpdateProductDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public decimal? Price { get; set; }
        public decimal? DiscountedPrice { get; set; }
        public int? DiscountPercent { get; set; }
        public int? Quantity { get; set; }
    }
}