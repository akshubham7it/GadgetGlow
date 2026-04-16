namespace EcommerceApi.DTOs
{
    public class ReviewCreateDto
    {
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public decimal Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }

    public class ReviewResponseDto
    {
        public int Id { get; set; }
        public string Comment { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string UserImage { get; set; } = "/user2.jpg";

        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
    }
}