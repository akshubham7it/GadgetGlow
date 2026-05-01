using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, MinLength(8)]
        public string Password { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;
        public string PhoneCode { get; set; } = "+977";
        public string Address { get; set; } = string.Empty;

        public bool IsBuyer { get; set; } = false;
        public bool IsSeller { get; set; } = false;

        // Sent as true from Signup.tsx when neither Buyer nor Seller is checked
        public bool IsAdmin { get; set; } = false;
    }

    public class LoginDto
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public UserInfoDto User { get; set; } = new();
    }

    public class UserInfoDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public bool IsAdmin { get; set; }
        public bool IsSeller { get; set; }
        public bool IsBuyer { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}