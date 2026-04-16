using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceApi.Data;
using EcommerceApi.DTOs;
using EcommerceApi.Models;
using System.Text.Json;

namespace EcommerceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts(
            [FromQuery] string? name,
            [FromQuery] List<string>? category,
            [FromQuery] List<string>? color,
            [FromQuery] List<string>? brand,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] decimal? minRating,
            [FromQuery] bool? freeDelivery,
            [FromQuery] int page = 1,
            [FromQuery] int limit = 20,
            [FromQuery] bool admin = false)
        {
            IQueryable<Product> query = _context.Products
                .Include(p => p.Brand)
                .Include(p => p.User)
                .Where(p => p.IsActive);

            // 1. Name search
            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(p => p.Name.Contains(name));

            // 2. Category filter
            if (category != null && category.Count > 0)
                query = query.Where(p => category.Contains(p.Category));

            // 3. Color filter — Colors stored as "black,blue"
            if (color != null && color.Count > 0)
                query = query.Where(p => color.Any(c => p.Colors.Contains(c)));

            // 4. Brand filter — fixed: join through Brand navigation property
            if (brand != null && brand.Count > 0)
                query = query.Where(p => p.Brand != null && brand.Contains(p.Brand.Name));

            // 5. Price range
            if (minPrice.HasValue)
                query = query.Where(p => p.DiscountedPrice >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(p => p.DiscountedPrice <= maxPrice.Value);

            // 6. Rating filter
            if (minRating.HasValue)
                query = query.Where(p => p.Rating >= minRating.Value);

            // 7. Free delivery
            if (freeDelivery.HasValue)
                query = query.Where(p => p.FreeDelivery == freeDelivery.Value);

            int totalCount = await query.CountAsync();
            int totalPages = (int)Math.Ceiling((double)totalCount / limit);

            var products = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            if (admin)
            {
                var adminDtos = products.Select(p => new ProductAdminDto
                {
                    Id = p.Id.ToString(),
                    Name = p.Name,
                    Image = p.DefaultImage,
                    Price = p.DiscountedPrice.ToString("F2"),
                    Quantity = p.Quantity.ToString(),
                    Status = p.IsActive ? "Active" : "In Active",
                    User = p.User != null ? new { id = p.UserId.ToString(), name = p.User.Name } : null,
                    Brand = p.Brand != null ? new { id = p.BrandId.ToString(), name = p.Brand.Name } : null
                }).ToList();

                return Ok(new ProductPagedResponse
                {
                    Products = adminDtos,
                    TotalCount = totalCount,
                    TotalPages = totalPages,
                    Page = page,
                    Limit = limit
                });
            }

            var storefrontDtos = products.Select(p => MapToListDto(p)).ToList();

            return Ok(new StorefrontProductPagedResponse
            {
                Products = storefrontDtos,
                TotalCount = totalCount,
                TotalPages = totalPages,
                Page = page,
                Limit = limit
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);

            if (product == null)
                return NotFound(new { message = "Product not found" });

            return Ok(new { product = MapToDetailDto(product) });
        }

        private ProductListDto MapToListDto(Product p)
        {
            var colorImages = ParseColorImages(p.ColorImages);
            var colors = p.Colors
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(c => c.Trim())
                .ToList();

            return new ProductListDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                DiscountedPrice = p.DiscountedPrice,
                DiscountPercent = p.DiscountPercent,
                Rating = p.Rating,
                ReviewCount = p.ReviewCount,
                Category = p.Category,
                DefaultImage = p.DefaultImage,
                ColorImages = colorImages,
                Colors = colors,
                FreeDelivery = p.FreeDelivery,
                FastDelivery = p.FastDelivery,
                HasPromo = p.HasPromo,
                BrandName = p.Brand?.Name
            };
        }

        private ProductDetailDto MapToDetailDto(Product p)
        {
            var colorImages = ParseColorImages(p.ColorImages);
            var colors = p.Colors
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(c => c.Trim())
                .ToList();

            return new ProductDetailDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                DiscountedPrice = p.DiscountedPrice,
                DiscountPercent = p.DiscountPercent,
                Rating = p.Rating,
                ReviewCount = p.ReviewCount,
                Category = p.Category,
                DefaultImage = p.DefaultImage,
                ColorImages = colorImages,
                Colors = colors,
                FreeDelivery = p.FreeDelivery,
                FastDelivery = p.FastDelivery,
                HasPromo = p.HasPromo,
                BrandName = p.Brand?.Name,
                BrandId = p.BrandId,
                UserId = p.UserId,
                UserName = p.User?.Name,
                Quantity = p.Quantity,
                IsActive = p.IsActive
            };
        }

        private static Dictionary<string, string> ParseColorImages(string json)
        {
            try
            {
                return JsonSerializer.Deserialize<Dictionary<string, string>>(json)
                       ?? new Dictionary<string, string>();
            }
            catch
            {
                return new Dictionary<string, string>();
            }
        }
    }
}