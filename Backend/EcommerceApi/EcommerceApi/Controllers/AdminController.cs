using EcommerceApi.Data;
using EcommerceApi.DTOs;
using EcommerceApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers(
            [FromQuery] string? status,
            [FromQuery] string? role,
            [FromQuery] string? name,
            [FromQuery] int page = 1,
            [FromQuery] int limit = 10)
        {
            IQueryable<AppUser> query = _context.Users;

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(u => u.Name.Contains(name));

            if (!string.IsNullOrWhiteSpace(status))
                query = query.Where(u => u.Status == status);

            // role filter: "admin" | "seller" | "buyer"
            if (!string.IsNullOrWhiteSpace(role))
            {
                var r = role.ToLower();
                if (r == "admin") query = query.Where(u => u.IsAdmin);
                if (r == "seller") query = query.Where(u => u.IsSeller);
                if (r == "buyer") query = query.Where(u => u.IsBuyer);
            }

            int totalCount = await query.CountAsync();

            var users = await query
                .OrderByDescending(u => u.CreatedAt)
                .Skip((page - 1) * limit)
                .Take(limit)
                .Select(u => new
                {
                    id = u.Id.ToString(),
                    name = u.Name,
                    email = u.Email,
                    phone = u.Phone,
                    phone_code = u.PhoneCode,
                    address = u.Address,
                    status = u.Status,
                    role = u.IsAdmin ? "admin" : u.IsSeller ? "seller" : "buyer",
                    isAdmin = u.IsAdmin,
                    isSeller = u.IsSeller,
                    isBuyer = u.IsBuyer,
                    createdAt = u.CreatedAt
                })
                .ToListAsync();

            return Ok(new
            {
                users,
                totalCount,
                totalPages = (int)Math.Ceiling((double)totalCount / limit),
                page,
                limit
            });
        }


        // GET /api/admin/products/{id}  — fetch single product for edit form
        [HttpGet("products/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var p = await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (p == null) return NotFound(new { msg = "Product not found" });

            return Ok(new
            {
                product = new
                {
                    id = p.Id,
                    name = p.Name,
                    description = p.Description,
                    category = p.Category,
                    price = p.Price,
                    discountedPrice = p.DiscountedPrice,
                    discountPercent = p.DiscountPercent,
                    quantity = p.Quantity,
                    colors = p.Colors,
                    defaultImage = p.DefaultImage,
                    isActive = p.IsActive,
                    userId = p.UserId,
                    brandId = p.BrandId,
                }
            });
        }

        // PATCH /api/admin/products/{id}  — update product from edit form
        [HttpPatch("products/{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateProduct(
            int id,
            [FromForm] string? name,
            [FromForm] string? description,
            [FromForm] string? category,
            [FromForm] decimal? price,
            [FromForm] decimal? discountedPrice,
            [FromForm] int? discountPercent,
            [FromForm] int? quantity,
            [FromForm] string? colors,
            [FromForm] string? imageUrl,
            IFormFile? image = null)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound(new { msg = "Product not found" });

            if (!string.IsNullOrWhiteSpace(name)) product.Name = name;
            if (!string.IsNullOrWhiteSpace(description)) product.Description = description;
            if (!string.IsNullOrWhiteSpace(category)) product.Category = category;
            if (price.HasValue) product.Price = price.Value;
            if (discountedPrice.HasValue) product.DiscountedPrice = discountedPrice.Value;
            if (discountPercent.HasValue) product.DiscountPercent = discountPercent.Value;
            if (quantity.HasValue) product.Quantity = quantity.Value;

            if (!string.IsNullOrWhiteSpace(colors))
            {
                var colorList = colors.Split(',')
                    .Select(c => c.Trim().ToLower())
                    .Distinct().Take(2).ToList();
                product.Colors = string.Join(",", colorList);

                var imgVal = !string.IsNullOrWhiteSpace(imageUrl) ? imageUrl : product.DefaultImage ?? "";
                var colorImages = new Dictionary<string, string> { ["default"] = imgVal };
                foreach (var c in colorList) colorImages[c] = imgVal;
                product.ColorImages = System.Text.Json.JsonSerializer.Serialize(colorImages);
            }

            if (!string.IsNullOrWhiteSpace(imageUrl))
            {
                product.DefaultImage = imageUrl.Trim();
            }
            else if (image != null && image.Length > 0)
            {
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                Directory.CreateDirectory(folder);
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
                var path = Path.Combine(folder, fileName);
                using var stream = new FileStream(path, FileMode.Create);
                await image.CopyToAsync(stream);
                product.DefaultImage = $"/uploads/{fileName}";
            }

            product.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return Ok(new { msg = "Product updated successfully" });
        }

        // GET /api/admin/users/{id}  — used by UsersEdit.tsx to prefill form
        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { msg = "User not found" });

            return Ok(new
            {
                user = new
                {
                    id = user.Id.ToString(),
                    name = user.Name,
                    email = user.Email,
                    phone = user.Phone,
                    phone_code = user.PhoneCode,
                    address = user.Address,
                    status = user.Status,
                    // Send derived role string so the frontend dropdown works
                    role = user.IsAdmin ? "admin" : user.IsSeller ? "seller" : "buyer",
                    isAdmin = user.IsAdmin,
                    isSeller = user.IsSeller,
                    isBuyer = user.IsBuyer
                }
            });
        }

        // POST /api/admin/users  — used by UsersCreate.tsx
        // Accepts a single "role" string and converts to booleans
        [HttpPost("users")]
        public async Task<IActionResult> CreateUser([FromBody] AdminUserCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { msg = "Invalid input" });

            var exists = await _context.Users
                .AnyAsync(u => u.Email.ToLower() == dto.Email.ToLower());
            if (exists)
                return BadRequest(new { msg = "Email already exists" });

            // Convert role string → booleans
            var (isAdmin, isSeller, isBuyer) = ParseRole(dto.Role);

            var user = new AppUser
            {
                Name = dto.Name,
                Email = dto.Email.ToLower(),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Phone = dto.Phone,
                PhoneCode = dto.PhoneCode,
                Address = dto.Address,
                IsAdmin = isAdmin,
                IsSeller = isSeller,
                IsBuyer = isBuyer,
                Status = dto.Status,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { msg = "User created successfully", userId = user.Id });
        }

        // PATCH /api/admin/users/{id}  — used by UsersEdit.tsx
        // Accepts a single "role" string and converts to booleans
        [HttpPatch("users/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] AdminUserUpdateDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { msg = "User not found" });

            if (!string.IsNullOrWhiteSpace(dto.Name)) user.Name = dto.Name;
            if (!string.IsNullOrWhiteSpace(dto.Email)) user.Email = dto.Email.ToLower();
            if (!string.IsNullOrWhiteSpace(dto.Phone)) user.Phone = dto.Phone;
            if (!string.IsNullOrWhiteSpace(dto.Address)) user.Address = dto.Address;
            if (!string.IsNullOrWhiteSpace(dto.Status)) user.Status = dto.Status;

            // Convert role string → booleans if role was sent
            if (!string.IsNullOrWhiteSpace(dto.Role))
            {
                var (isAdmin, isSeller, isBuyer) = ParseRole(dto.Role);
                user.IsAdmin = isAdmin;
                user.IsSeller = isSeller;
                user.IsBuyer = isBuyer;
            }

            if (!string.IsNullOrWhiteSpace(dto.Password))
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            await _context.SaveChangesAsync();
            return Ok(new { msg = "User updated successfully" });
        }

        // DELETE /api/admin/users/{id}  — used by Users.tsx delete button
        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            // Prevent deleting yourself
            var callerIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (callerIdClaim == id.ToString())
                return BadRequest(new { msg = "You cannot delete your own account" });

            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { msg = "User not found" });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok(new { msg = "User deleted successfully" });
        }

        
        // PRODUCT MANAGEMENT

        [HttpGet("products")]
        public async Task<IActionResult> GetProducts(
            [FromQuery] string? name,
            [FromQuery] int page = 1,
            [FromQuery] int limit = 10)
        {
            IQueryable<Product> query = _context.Products
                .Include(p => p.Brand)
                .Include(p => p.User);

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(p => p.Name.Contains(name));

            int totalCount = await query.CountAsync();

            var products = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * limit)
                .Take(limit)
                .Select(p => new
                {
                    id = p.Id.ToString(),
                    name = p.Name,
                    image = p.DefaultImage,
                    price = p.DiscountedPrice.ToString("F2"),
                    quantity = p.Quantity.ToString(),
                    status = p.IsActive ? "Active" : "In Active",
                    user = p.User != null ? (object)new { id = p.UserId.ToString(), name = p.User.Name } : null,
                    brand = p.Brand != null ? (object)new { id = p.BrandId.ToString(), name = p.Brand.Name } : null
                })
                .ToListAsync();

            return Ok(new
            {
                products,
                totalCount,
                totalPages = (int)Math.Ceiling((double)totalCount / limit),
                page,
                limit
            });
        }

        [HttpDelete("products/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound(new { msg = "Product not found" });

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok(new { msg = "Product deleted successfully" });
        }

        [HttpPatch("products/{id}/toggle")]
        public async Task<IActionResult> ToggleProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound(new { msg = "Product not found" });

            product.IsActive = !product.IsActive;
            product.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return Ok(new { msg = $"Product is now {(product.IsActive ? "Active" : "Inactive")}" });
        }

        // ── Helper: convert "admin" | "seller" | "buyer" → booleans ──
        private static (bool isAdmin, bool isSeller, bool isBuyer) ParseRole(string role)
        {
            return role.ToLower() switch
            {
                "admin" => (true, false, false),
                "seller" => (false, true, false),
                "buyer" => (false, false, true),
                _ => (false, false, true)  // default to buyer
            };
        }
    }

    public class AdminUserCreateDto
    {
        [System.ComponentModel.DataAnnotations.Required]
        public string Name { get; set; } = string.Empty;
        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.EmailAddress]
        public string Email { get; set; } = string.Empty;
        [System.ComponentModel.DataAnnotations.Required]
        public string Password { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string PhoneCode { get; set; } = "+977";
        public string Address { get; set; } = string.Empty;
        public string Role { get; set; } = "buyer";  // "admin" | "seller" | "buyer"
        public string Status { get; set; } = "Approved";
    }

    public class AdminUserUpdateDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Status { get; set; }
        public string? Role { get; set; } 
    }
}