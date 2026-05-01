using EcommerceApi.Data;
using EcommerceApi.DTOs;
using EcommerceApi.Models;
using EcommerceApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;

        public AuthController(AppDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // POST /api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { msg = "Invalid input" });

            // Must be buyer, seller, OR admin (loophole: neither = admin)
            if (!dto.IsBuyer && !dto.IsSeller && !dto.IsAdmin)
                return BadRequest(new { msg = "Please select at least one role" });

            var exists = await _context.Users
                .AnyAsync(u => u.Email.ToLower() == dto.Email.ToLower());
            if (exists)
                return BadRequest(new { msg = "Email is already registered" });

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password, workFactor: 11);

            var user = new AppUser
            {
                Name = dto.Name,
                Email = dto.Email.ToLower(),
                PasswordHash = passwordHash,
                Phone = dto.Phone,
                PhoneCode = dto.PhoneCode,
                Address = dto.Address,
                IsBuyer = dto.IsBuyer,
                IsSeller = dto.IsSeller,
                IsAdmin = dto.IsAdmin,   
                Status = "Approved",
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Generate token with correct role claims
            var token = _jwtService.GenerateToken(user);

            return Ok(new AuthResponseDto
            {
                Token = token,
                Message = "Registration successful",
                User = MapToUserInfo(user)
            });
        }

        // POST /api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { msg = "Invalid input" });

            // Find by email (case-insensitive)
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());

            if (user == null)
                return Unauthorized(new { msg = "Invalid email or password" });

            if (user.Status == "Suspended")
                return Unauthorized(new { msg = "Your account has been suspended" });

            var hash = user.PasswordHash ?? "";

            bool passwordValid = false;

            if (hash.StartsWith("$2a$") || hash.StartsWith("$2b$") || hash.StartsWith("$2y$"))
            {
                
                try
                {
                    passwordValid = BCrypt.Net.BCrypt.Verify(
                        dto.Password,
                        hash,
                        enhancedEntropy: false
                    );
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[Login] BCrypt.Verify error for {user.Email}: {ex.Message}");
                    return Unauthorized(new { msg = "Invalid email or password" });
                }
            }
            else
            {
                
                passwordValid = (hash == dto.Password);

                if (passwordValid)
                {
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password, workFactor: 11);
                    await _context.SaveChangesAsync();
                    Console.WriteLine($"[Login] Password auto-upgraded for {user.Email}");
                }
            }

            if (!passwordValid)
                return Unauthorized(new { msg = "Invalid email or password" });

            var token = _jwtService.GenerateToken(user);

            return Ok(new AuthResponseDto
            {
                Token = token,
                Message = "Login successful",
                User = MapToUserInfo(user)
            });
        }

        // GET /api/auth/me
        [HttpGet("me")]
        [Microsoft.AspNetCore.Authorization.Authorize]
        public async Task<IActionResult> GetMe()
        {
            var userIdClaim = User.FindFirst(
                System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { msg = "Invalid token" });

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound(new { msg = "User not found" });

            return Ok(new { user = MapToUserInfo(user) });
        }

        private static UserInfoDto MapToUserInfo(AppUser u) => new UserInfoDto
        {
            Id = u.Id,
            Name = u.Name,
            Email = u.Email,
            Phone = u.Phone,
            Address = u.Address,
            IsAdmin = u.IsAdmin,
            IsSeller = u.IsSeller,
            IsBuyer = u.IsBuyer,
            Status = u.Status
        };
    }
}