using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Comment { get; set; } = string.Empty;

        public decimal Rating { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public int UserId { get; set; }
        public AppUser? User { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}