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
        [Authorize(Roles = "Admin,Seller")] // Only Admin or Seller can post products
        public class PostProductController : ControllerBase
        {
            private readonly AppDbContext _context;

            public PostProductController(AppDbContext context)
            {
                _context = context;
            }

            // ─────────────────────────────────────────────────────────────
            // POST /api/postproduct
            // Creates a new product — linked to the logged-in user
            // ─────────────────────────────────────────────────────────────
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
                [FromForm] int? brandId,
                [FromForm] int discountPercent = 0,
                IFormFile? image = null)
            {
                if (string.IsNullOrWhiteSpace(name))
                    return BadRequest(new { msg = "Product name is required" });

                // Get the logged-in user's ID from JWT claims
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!int.TryParse(userIdClaim, out var userId))
                    return Unauthorized(new { msg = "Invalid token" });

                // Handle image upload
                string? imageUrl = null;
                if (image != null && image.Length > 0)
                    imageUrl = await SaveImageAsync(image);

                // Build color → image map
                var colorList = colors
                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(c => c.Trim())
                    .Take(2) // max 2 colors as per project rules
                    .ToList();

                var colorImages = new Dictionary<string, string>();
                colorImages["default"] = imageUrl ?? "";
                foreach (var color in colorList)
                    colorImages[color] = imageUrl ?? "";

                var product = new Product
                {
                    Name = name,
                    Description = description,
                    Category = category,
                    Price = price,
                    DiscountedPrice = discountedPrice,
                    DiscountPercent = discountPercent,
                    Quantity = quantity,
                    Colors = string.Join(",", colorList),
                    ColorImages = JsonSerializer.Serialize(colorImages),
                    DefaultImage = imageUrl,
                    BrandId = brandId,
                    UserId = userId,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                return Ok(new { msg = "Product posted successfully", productId = product.Id });
            }

            // ─────────────────────────────────────────────────────────────
            // PATCH /api/postproduct/{id}
            // Seller can only edit their OWN products
            // Admin can edit any product
            // ─────────────────────────────────────────────────────────────
            [HttpPatch("{id}")]
            public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductDto dto)
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null) return NotFound(new { msg = "Product not found" });

                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                int.TryParse(userIdClaim, out var userId);
                bool isAdmin = User.IsInRole("Admin");

                // Seller can only edit their own product
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

            // ─────────────────────────────────────────────────────────────
            // DELETE /api/postproduct/{id}
            // Seller deletes only their own; Admin deletes any (soft delete)
            // ─────────────────────────────────────────────────────────────
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

                return Ok(new { msg = "Product deleted" });
            }

            // ─────────────────────────────────────────────────────────────
            // GET /api/postproduct/my
            // Seller sees only their own products
            // ─────────────────────────────────────────────────────────────
            [HttpGet("my")]
            public async Task<IActionResult> GetMyProducts()
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!int.TryParse(userIdClaim, out var userId))
                    return Unauthorized();

                var products = await _context.Products
                    .Where(p => p.UserId == userId)
                    .OrderByDescending(p => p.CreatedAt)
                    .Select(p => new
                    {
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

            // ── Helper ─────────────────────────────────────────────────────
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