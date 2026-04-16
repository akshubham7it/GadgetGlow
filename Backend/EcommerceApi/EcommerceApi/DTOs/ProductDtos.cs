namespace EcommerceApi.DTOs
{
    public class ProductListDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal DiscountedPrice { get; set; }
        public int DiscountPercent { get; set; }
        public decimal Rating { get; set; }
        public int ReviewCount { get; set; }
        public string Category { get; set; } = string.Empty;
        public string? DefaultImage { get; set; }
        public Dictionary<string, string> ColorImages { get; set; } = new();
        public List<string> Colors { get; set; } = new();
        public bool FreeDelivery { get; set; }
        public bool FastDelivery { get; set; }
        public bool HasPromo { get; set; }
        public string? BrandName { get; set; }
    }

    public class ProductDetailDto : ProductListDto
    {
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string? UserName { get; set; }
        public int? BrandId { get; set; }
        public int? UserId { get; set; }
        public bool IsActive { get; set; }
    }

    public class ProductAdminDto
    {
        public string? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Image { get; set; }
        public string Price { get; set; } = string.Empty;
        public string Quantity { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public object? User { get; set; }
        public object? Brand { get; set; }
    }

    public class ProductCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string BrandId { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;
        public string DiscountedPrice { get; set; } = string.Empty;
        public string Quantity { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public int DiscountPercent { get; set; } = 0;
    }

    public class ProductUpdateDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? UserId { get; set; }
        public string? BrandId { get; set; }
        public decimal? Price { get; set; }
        public decimal? DiscountedPrice { get; set; }
        public int? Quantity { get; set; }
        public string? Color { get; set; }
        public int? DiscountPercent { get; set; }
    }

    public class ProductPagedResponse
    {
        public List<ProductAdminDto> Products { get; set; } = new();
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public int Page { get; set; }
        public int Limit { get; set; }
    }

    public class StorefrontProductPagedResponse
    {
        public List<ProductListDto> Products { get; set; } = new();
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public int Page { get; set; }
        public int Limit { get; set; }
    }
}