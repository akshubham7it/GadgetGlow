namespace EcommerceApi.Models
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string PhoneCode { get; set; } = "+977";
        public bool IsAdmin { get; set; } = false;
        public bool IsSeller { get; set; } = false;
        public bool IsBuyer { get; set; } = true;
        public string Status { get; set; } = "Pending";
        public string Address { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Product> Products { get; set; } = new List<Product>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}