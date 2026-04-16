using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceApi.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal DiscountedPrice { get; set; }

        // NEW: stores discount percentage e.g. 30, 46, 20
        public int DiscountPercent { get; set; } = 0;

        public int Quantity { get; set; }

        [MaxLength(500)]
        public string Colors { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string ColorImages { get; set; } = "{}";

        [MaxLength(500)]
        public string? DefaultImage { get; set; }

        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        public decimal Rating { get; set; } = 0;
        public int ReviewCount { get; set; } = 0;
        public bool FreeDelivery { get; set; } = false;
        public bool FastDelivery { get; set; } = false;
        public bool HasPromo { get; set; } = false;
        public bool IsActive { get; set; } = true;

        public int? BrandId { get; set; }
        public Brand? Brand { get; set; }

        public int? UserId { get; set; }
        public AppUser? User { get; set; }

        // Navigation
        public ICollection<Review> Reviews { get; set; } = new List<Review>();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}