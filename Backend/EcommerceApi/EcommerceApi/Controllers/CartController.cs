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
    [Authorize] // ALL cart endpoints require login
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        // ── Helper: get logged-in userId from JWT ─────────────────────
        private int? GetUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(claim, out var id) ? id : null;
        }

        // ── Helper: parse ColorImages JSON safely ─────────────────────
        private static string GetDefaultImage(string colorImagesJson, string? defaultImage)
        {
            try
            {
                var dict = JsonSerializer.Deserialize<Dictionary<string, string>>(colorImagesJson);
                if (dict != null && dict.TryGetValue("default", out var url))
                    return url;
            }
            catch { }
            return defaultImage ?? "";
        }

        // ─────────────────────────────────────────────────────────────
        // GET /api/cart?page=1&limit=4
        // Returns all cart items for the logged-in user, paginated
        // Calculates itemTotal = quantity * discountedPrice per row
        // ─────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> GetCart(
            [FromQuery] int page = 1,
            [FromQuery] int limit = 4)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized(new { msg = "Invalid token" });

            var query = _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId);

            int totalCount = await query.CountAsync();
            int totalPages = (int)Math.Ceiling((double)totalCount / limit);

            var items = await query
                .OrderByDescending(c => c.AddedAt)
                .Skip((page - 1) * limit)
                .Take(limit)
                .Select(c => new
                {
                    cartItemId = c.Id,
                    productId = c.ProductId,
                    productName = c.Product != null ? c.Product.Name : "",
                    productImage = c.Product != null
                        ? GetDefaultImage(c.Product.ColorImages, c.Product.DefaultImage)
                        : "",
                    unitPrice = c.Product != null ? c.Product.DiscountedPrice : 0,
                    quantity = c.Quantity,
                    // Backend calculates the total — no trust issues
                    itemTotal = c.Product != null ? c.Product.DiscountedPrice * c.Quantity : 0,
                    maxQuantity = c.Product != null ? c.Product.Quantity : 99,
                    addedAt = c.AddedAt
                })
                .ToListAsync();

            // Grand total across ALL pages (not just current page)
            var grandTotal = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .SumAsync(c => c.Product != null ? c.Product.DiscountedPrice * c.Quantity : 0);

            return Ok(new
            {
                items,
                totalCount,
                totalPages,
                page,
                limit,
                grandTotal
            });
        }

        // ─────────────────────────────────────────────────────────────
        // POST /api/cart
        // Add a product to cart. If it already exists, increment qty.
        // Called from Detail.tsx "Add to Cart" button
        // ─────────────────────────────────────────────────────────────
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDto dto)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized(new { msg = "Invalid token" });

            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null)
                return NotFound(new { msg = "Product not found" });

            if (dto.Quantity < 1)
                return BadRequest(new { msg = "Quantity must be at least 1" });

            if (dto.Quantity > product.Quantity)
                return BadRequest(new { msg = $"Only {product.Quantity} in stock" });

            // Check if this product is already in the user's cart
            var existing = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == dto.ProductId);

            if (existing != null)
            {
                // Already in cart — update quantity instead
                var newQty = existing.Quantity + dto.Quantity;
                if (newQty > product.Quantity)
                    newQty = product.Quantity; // cap at stock
                existing.Quantity = newQty;
            }
            else
            {
                _context.CartItems.Add(new CartItem
                {
                    UserId = userId.Value,
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity,
                    AddedAt = DateTime.UtcNow
                });
            }

            await _context.SaveChangesAsync();
            return Ok(new { msg = "Added to cart" });
        }

        // ─────────────────────────────────────────────────────────────
        // PATCH /api/cart/{cartItemId}
        // Update quantity of a specific cart item
        // Returns new itemTotal so frontend can update immediately
        // ─────────────────────────────────────────────────────────────
        [HttpPatch("{cartItemId}")]
        public async Task<IActionResult> UpdateQuantity(int cartItemId, [FromBody] UpdateCartDto dto)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized(new { msg = "Invalid token" });

            var cartItem = await _context.CartItems
                .Include(c => c.Product)
                .FirstOrDefaultAsync(c => c.Id == cartItemId && c.UserId == userId);

            if (cartItem == null)
                return NotFound(new { msg = "Cart item not found" });

            if (dto.Quantity < 1)
                return BadRequest(new { msg = "Quantity must be at least 1" });

            var maxStock = cartItem.Product?.Quantity ?? 99;
            if (dto.Quantity > maxStock)
                return BadRequest(new { msg = $"Only {maxStock} in stock" });

            cartItem.Quantity = dto.Quantity;
            await _context.SaveChangesAsync();

            var unitPrice = cartItem.Product?.DiscountedPrice ?? 0;
            var itemTotal = unitPrice * cartItem.Quantity;

            // Also return updated grand total
            var grandTotal = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .SumAsync(c => c.Product != null ? c.Product.DiscountedPrice * c.Quantity : 0);

            return Ok(new
            {
                msg = "Quantity updated",
                quantity = cartItem.Quantity,
                unitPrice,
                itemTotal,
                grandTotal
            });
        }

        // ─────────────────────────────────────────────────────────────
        // DELETE /api/cart/{cartItemId}
        // Remove a single item from cart
        // ─────────────────────────────────────────────────────────────
        [HttpDelete("{cartItemId}")]
        public async Task<IActionResult> RemoveFromCart(int cartItemId)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized(new { msg = "Invalid token" });

            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.Id == cartItemId && c.UserId == userId);

            if (cartItem == null)
                return NotFound(new { msg = "Cart item not found" });

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            // Return updated grand total after removal
            var grandTotal = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .SumAsync(c => c.Product != null ? c.Product.DiscountedPrice * c.Quantity : 0);

            return Ok(new { msg = "Item removed", grandTotal });
        }

        // ─────────────────────────────────────────────────────────────
        // DELETE /api/cart
        // Clear entire cart
        // ─────────────────────────────────────────────────────────────
        [HttpDelete]
        public async Task<IActionResult> ClearCart()
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized(new { msg = "Invalid token" });

            var items = await _context.CartItems
                .Where(c => c.UserId == userId)
                .ToListAsync();

            _context.CartItems.RemoveRange(items);
            await _context.SaveChangesAsync();

            return Ok(new { msg = "Cart cleared" });
        }
    }

    // ── DTOs ──────────────────────────────────────────────────────────
    public class AddToCartDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; } = 1;
    }

    public class UpdateCartDto
    {
        public int Quantity { get; set; }
    }
}