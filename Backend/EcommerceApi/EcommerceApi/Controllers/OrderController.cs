using EcommerceApi.Data;
using EcommerceApi.Models;
using EcommerceApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EcommerceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EmailService _emailService;

        public OrderController(AppDbContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        private int? GetUserId()
        {
            var c = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(c, out var id) ? id : null;
        }
        // ─────────────────────────────────────────────────────────────
        // GET /api/order/my-user-orders
        // Returns all purchased products for logged-in user
        // ─────────────────────────────────────────────────────────────
        [HttpGet("my-user-orders")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized(new { msg = "Invalid token" });

            var items = await _context.OrderItems
                .Include(i => i.Order)
                .Include(i => i.Product)
                .Where(i => i.Order != null && i.Order.UserId == userId)
                .OrderByDescending(i => i.Order!.OrderedAt)
                .Select(i => new
                {
                    orderItemId = i.Id,
                    productId = i.ProductId,
                    productName = i.ProductName,
                    productImageUrl = i.Product != null
                        ? i.Product.DefaultImage
                        : "",
                    quantity = i.Quantity,
                    unitPrice = i.UnitPrice,
                    itemTotal = i.ItemTotal,
                    orderedAt = i.Order != null
                        ? i.Order.OrderedAt
                        : DateTime.UtcNow
                })
                .ToListAsync();

            return Ok(new
            {
                items
            });
        }

        // ─────────────────────────────────────────────────────────────
        // POST /api/order/checkout
        // Any logged-in user can checkout
        // Saves Order + OrderItems → clears cart → sends email
        // ─────────────────────────────────────────────────────────────
        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout()
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            // Get all cart items with product info
            var cartItems = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId && c.Product != null && c.Product.IsActive)
                .ToListAsync();

            if (!cartItems.Any())
                return BadRequest(new { msg = "Your cart is empty" });

            var user = await _context.Users.FindAsync(userId);

            var grandTotal = cartItems.Sum(c => c.Product!.DiscountedPrice * c.Quantity);

            // Build Order — unchanged, working fine
            var order = new Order
            {
                UserId = userId.Value,
                OrderedAt = DateTime.UtcNow,
                Status = "Confirmed",
                GrandTotal = grandTotal,
                Items = cartItems.Select(c => new OrderItem
                {
                    ProductId = c.ProductId,
                    ProductName = c.Product!.Name,
                    UnitPrice = c.Product.DiscountedPrice,
                    Quantity = c.Quantity,
                    ItemTotal = c.Product.DiscountedPrice * c.Quantity
                }).ToList()
            };

            _context.Orders.Add(order);

            // Clear cart after checkout
            _context.CartItems.RemoveRange(cartItems);

            await _context.SaveChangesAsync();

            // ── Send confirmation email ──────────────────────────────
            if (user != null && !string.IsNullOrEmpty(user.Email))
            {
                try
                {
                    await SendOrderConfirmationEmail(order, user.Name, user.Email);
                }
                catch (Exception ex)
                {
                    // Don't fail the order if email fails — just log it
                    Console.WriteLine($"Email failed: {ex.Message}");
                }
            }

            return Ok(new
            {
                msg = "Order placed successfully!",
                orderId = order.Id,
                grandTotal = order.GrandTotal,
                email = user?.Email
            });
        }

        // ─────────────────────────────────────────────────────────────
        // GET /api/order/myorders  — Admin only
        // ─────────────────────────────────────────────────────────────
        [HttpGet("myorders")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllOrders(
            [FromQuery] int page = 1,
            [FromQuery] int limit = 10)
        {
            var total = await _context.Orders.CountAsync();

            var orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Items).ThenInclude(i => i.Product)
                .OrderByDescending(o => o.OrderedAt)
                .Skip((page - 1) * limit)
                .Take(limit)
                .Select(o => new
                {
                    orderId = o.Id,
                    orderedAt = o.OrderedAt,
                    status = o.Status,
                    grandTotal = o.GrandTotal,
                    userName = o.User != null ? o.User.Name : "Unknown",
                    userId = o.UserId,
                    items = o.Items.Select(i => new
                    {
                        productId = i.ProductId,
                        productName = i.ProductName,
                        unitPrice = i.UnitPrice,
                        quantity = i.Quantity,
                        itemTotal = i.ItemTotal,
                        image = i.Product != null ? i.Product.DefaultImage : ""
                    })
                })
                .ToListAsync();

            return Ok(new
            {
                orders,
                totalCount = total,
                totalPages = (int)Math.Ceiling((double)total / limit),
                page,
                limit
            });
        }

        // ─────────────────────────────────────────────────────────────
        // Email helper — builds and sends the order confirmation email
        // ─────────────────────────────────────────────────────────────
        private async Task SendOrderConfirmationEmail(Order order, string userName, string toEmail)
        {
            var itemRows = string.Join("", order.Items.Select(i => $@"
                <tr>
                    <td style='padding:10px 12px;border-bottom:1px solid #f0f0f0;'>
                        <span style='font-weight:500;color:#1C274C;'>{i.ProductName}</span>
                    </td>
                    <td style='padding:10px 12px;border-bottom:1px solid #f0f0f0;text-align:center;'>{i.Quantity}</td>
                    <td style='padding:10px 12px;border-bottom:1px solid #f0f0f0;text-align:right;'>${i.UnitPrice:N2}</td>
                    <td style='padding:10px 12px;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600;color:#1C274C;'>${i.ItemTotal:N2}</td>
                </tr>"));

            var emailBody = $@"
            <div style='font-family:Arial,sans-serif;max-width:620px;margin:auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;'>

                <!-- Header -->
                <div style='background:#1C274C;padding:28px 32px;text-align:center;'>
                    <h1 style='color:#ffffff;margin:0;font-size:22px;letter-spacing:0.5px;'>Order Confirmed ✓</h1>
                    <p style='color:#a0aec0;margin:6px 0 0;font-size:14px;'>Thank you for your purchase!</p>
                </div>

                <!-- Greeting -->
                <div style='padding:24px 32px 0;'>
                    <p style='font-size:15px;color:#374151;margin:0;'>Hi <strong>{userName}</strong>,</p>
                    <p style='font-size:14px;color:#6b7280;margin:8px 0 0;'>
                        Your order <strong style='color:#1C274C;'>#{order.Id}</strong> has been placed successfully on 
                        <strong>{order.OrderedAt:MMMM dd, yyyy}</strong> at <strong>{order.OrderedAt:hh:mm tt} UTC</strong>.
                    </p>
                </div>

                <!-- Order Items Table -->
                <div style='padding:20px 32px;'>
                    <table style='width:100%;border-collapse:collapse;font-size:14px;'>
                        <thead>
                            <tr style='background:#f9fafb;'>
                                <th style='padding:10px 12px;text-align:left;color:#1C274C;font-weight:600;border-bottom:2px solid #e5e7eb;'>Product</th>
                                <th style='padding:10px 12px;text-align:center;color:#1C274C;font-weight:600;border-bottom:2px solid #e5e7eb;'>Qty</th>
                                <th style='padding:10px 12px;text-align:right;color:#1C274C;font-weight:600;border-bottom:2px solid #e5e7eb;'>Unit Price</th>
                                <th style='padding:10px 12px;text-align:right;color:#1C274C;font-weight:600;border-bottom:2px solid #e5e7eb;'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemRows}
                        </tbody>
                    </table>
                </div>

                <!-- Totals -->
                <div style='padding:0 32px 24px;'>
                    <table style='width:100%;font-size:14px;'>
                        <tr>
                            <td style='padding:4px 0;color:#6b7280;'>Subtotal</td>
                            <td style='padding:4px 0;text-align:right;color:#374151;'>${order.GrandTotal:N2}</td>
                        </tr>
                        <tr>
                            <td style='padding:4px 0;color:#6b7280;'>Shipping</td>
                            <td style='padding:4px 0;text-align:right;color:#16a34a;font-weight:500;'>Free</td>
                        </tr>
                        <tr>
                            <td style='padding:4px 0;color:#6b7280;'>Tax (13%)</td>
                            <td style='padding:4px 0;text-align:right;color:#374151;'>${order.GrandTotal * 0.13m:N2}</td>
                        </tr>
                        <tr style='border-top:2px solid #e5e7eb;'>
                            <td style='padding:10px 0 4px;font-weight:700;font-size:15px;color:#1C274C;'>Grand Total</td>
                            <td style='padding:10px 0 4px;text-align:right;font-weight:700;font-size:15px;color:#1C274C;'>${order.GrandTotal * 1.13m:N2}</td>
                        </tr>
                    </table>
                </div>

                <!-- Status Badge -->
                <div style='padding:0 32px 24px;'>
                    <div style='background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px;display:inline-block;'>
                        <span style='color:#16a34a;font-weight:600;font-size:14px;'>● Status: {order.Status}</span>
                    </div>
                </div>

                <!-- Footer -->
                <div style='background:#f9fafb;padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb;'>
                    <p style='font-size:12px;color:#9ca3af;margin:0;'>
                        This is an automated confirmation email. Please do not reply to this email.
                    </p>
                </div>

            </div>";

            await _emailService.SendEmailAsync(
                toEmail,
                $"Order Confirmed #{order.Id} — Thank you for your purchase!",
                emailBody
            );
        }
    }
}
