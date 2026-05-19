using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceApi.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        // Which user owns this cart item
        public int UserId { get; set; }
        public AppUser? User { get; set; }

        // Which product
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        // How many the user wants
        public int Quantity { get; set; } = 1;

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    }
}