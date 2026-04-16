using Microsoft.EntityFrameworkCore;
using EcommerceApi.Models;
using System.Text.Json;

namespace EcommerceApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ── Primary Keys (explicit) ───────────────────────────────────
            modelBuilder.Entity<Product>()
                .HasKey(p => p.Id);
            modelBuilder.Entity<Product>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Brand>()
                .HasKey(b => b.Id);
            modelBuilder.Entity<Brand>()
                .Property(b => b.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<AppUser>()
                .HasKey(u => u.Id);
            modelBuilder.Entity<AppUser>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Review>()
                .HasKey(r => r.Id);
            modelBuilder.Entity<Review>()
                .Property(r => r.Id)
                .ValueGeneratedOnAdd();

            // ── Relationships ─────────────────────────────────────────────
            modelBuilder.Entity<Product>()
                .HasOne<Brand>(p => p.Brand)
                .WithMany(b => b.Products)
                .HasForeignKey(p => p.BrandId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Product>()
                .HasOne<AppUser>(p => p.User)
                .WithMany(u => u.Products)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Review>()
                .HasOne<Product>(r => r.Product)
                .WithMany(p => p.Reviews)
                .HasForeignKey(r => r.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Review>()
                .HasOne<AppUser>(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ── Seed Brands ───────────────────────────────────────────────
            modelBuilder.Entity<Brand>().HasData(
                new Brand { Id = 1, Name = "Apple", Description = "Premium Apple products", IsActive = true, CreatedAt = new DateTime(2025, 1, 1) },
                new Brand { Id = 2, Name = "Rangs Electronics", Description = "Electronics brand", IsActive = true, CreatedAt = new DateTime(2025, 1, 1) },
                new Brand { Id = 3, Name = "Havit", Description = "Gaming accessories", IsActive = true, CreatedAt = new DateTime(2025, 1, 1) },
                new Brand { Id = 4, Name = "Samsung", Description = "Samsung Electronics", IsActive = true, CreatedAt = new DateTime(2025, 1, 1) },
                new Brand { Id = 5, Name = "Sony", Description = "Sony Electronics", IsActive = true, CreatedAt = new DateTime(2025, 1, 1) },
                new Brand { Id = 6, Name = "Dell", Description = "Dell Technologies", IsActive = true, CreatedAt = new DateTime(2025, 1, 1) },
                new Brand { Id = 7, Name = "Dyson", Description = "Dyson Home Appliances", IsActive = true, CreatedAt = new DateTime(2025, 1, 1) },
                new Brand { Id = 8, Name = "Garmin", Description = "Garmin Wearables", IsActive = true, CreatedAt = new DateTime(2025, 1, 1) },
                new Brand { Id = 9, Name = "Logitech", Description = "Logitech Peripherals", IsActive = true, CreatedAt = new DateTime(2025, 1, 1) },
                new Brand { Id = 10, Name = "Generic", Description = "General products", IsActive = true, CreatedAt = new DateTime(2025, 1, 1) }
            );

            // ── Seed Users ────────────────────────────────────────────────
            modelBuilder.Entity<AppUser>().HasData(
                new AppUser { Id = 1, Name = "Shubham Ghimire", Email = "shubham@gmail.com", PasswordHash = "hashed_password", IsAdmin = true, IsSeller = false, IsBuyer = false, Status = "Approved", PhoneCode = "+977", Phone = "9800000001", Address = "Kathmandu", CreatedAt = new DateTime(2025, 1, 1) },
                new AppUser { Id = 2, Name = "Aayush Sharma", Email = "aayush@gmail.com", PasswordHash = "hashed_password", IsAdmin = false, IsSeller = true, IsBuyer = false, Status = "Approved", PhoneCode = "+977", Phone = "9800000002", Address = "Pokhara", CreatedAt = new DateTime(2025, 1, 1) },
                new AppUser { Id = 3, Name = "Rohan Karki", Email = "rohan@gmail.com", PasswordHash = "hashed_password", IsAdmin = false, IsSeller = false, IsBuyer = true, Status = "Approved", PhoneCode = "+977", Phone = "9800000003", Address = "Lalitpur", CreatedAt = new DateTime(2025, 1, 1) },
                new AppUser { Id = 4, Name = "Suman Thapa", Email = "suman@gmail.com", PasswordHash = "hashed_password", IsAdmin = false, IsSeller = true, IsBuyer = true, Status = "Approved", PhoneCode = "+977", Phone = "9800000004", Address = "Bhaktapur", CreatedAt = new DateTime(2025, 1, 1) },
                new AppUser { Id = 5, Name = "Prakash Adhikari", Email = "prakash@gmail.com", PasswordHash = "hashed_password", IsAdmin = false, IsSeller = false, IsBuyer = true, Status = "Approved", PhoneCode = "+977", Phone = "9800000005", Address = "Chitwan", CreatedAt = new DateTime(2025, 1, 1) },
                new AppUser { Id = 6, Name = "Bikash Gurung", Email = "bikash@gmail.com", PasswordHash = "hashed_password", IsAdmin = false, IsSeller = true, IsBuyer = false, Status = "Approved", PhoneCode = "+977", Phone = "9800000006", Address = "Butwal", CreatedAt = new DateTime(2025, 1, 1) },
                new AppUser { Id = 7, Name = "Nabin Shrestha", Email = "nabin@gmail.com", PasswordHash = "hashed_password", IsAdmin = false, IsSeller = false, IsBuyer = true, Status = "Approved", PhoneCode = "+977", Phone = "9800000007", Address = "Dharan", CreatedAt = new DateTime(2025, 1, 1) },
                new AppUser { Id = 8, Name = "Kiran Rai", Email = "kiran@gmail.com", PasswordHash = "hashed_password", IsAdmin = false, IsSeller = true, IsBuyer = true, Status = "Approved", PhoneCode = "+977", Phone = "9800000008", Address = "Biratnagar", CreatedAt = new DateTime(2025, 1, 1) },
                new AppUser { Id = 9, Name = "Santosh Bhandari", Email = "santosh@gmail.com", PasswordHash = "hashed_password", IsAdmin = false, IsSeller = false, IsBuyer = true, Status = "Approved", PhoneCode = "+977", Phone = "9800000009", Address = "Janakpur", CreatedAt = new DateTime(2025, 1, 1) },
                new AppUser { Id = 10, Name = "Dipesh KC", Email = "dipesh@gmail.com", PasswordHash = "hashed_password", IsAdmin = true, IsSeller = true, IsBuyer = true, Status = "Approved", PhoneCode = "+977", Phone = "9800000010", Address = "Kathmandu", CreatedAt = new DateTime(2025, 1, 1) }
            );

            // ── Seed Products (50 products) ───────────────────────────────
            // Rules applied:
            // - Exactly 2 colors per product from: black, white, gray, blue, orange, green
            // - Each color has its own correct image URL
            // - URLs are stable Unsplash photo IDs matching the actual product
            modelBuilder.Entity<Product>().HasData(

                // ── HOME APPLIANCES ──────────────────────────────────────

                // 1 - Electric Grinder (kitchen appliance)
                new Product
                {
                    Id = 1,
                    Name = "Portable Electric Grinder Maker",
                    Description = "High-performance portable electric grinder suitable for home use. Compact design with powerful motor.",
                    Price = 888,
                    DiscountedPrice = 777,
                    DiscountPercent = 12,
                    Quantity = 50,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80",
                    Category = "Home Appliances",
                    Rating = 1,
                    ReviewCount = 2,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 1, 1),
                    UpdatedAt = new DateTime(2025, 1, 1)
                },

                // ── HEALTH & SPORTS ──────────────────────────────────────

                // 2 - Treadmill (actual treadmill photo)
                new Product
                {
                    Id = 2,
                    Name = "Indoor Steel Adjustable Silent Treadmill",
                    Description = "Foldable motorised treadmill for home workouts. Ultra-silent motor with adjustable speed settings.",
                    Price = 999,
                    DiscountedPrice = 888,
                    DiscountPercent = 11,
                    Quantity = 20,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
                    Category = "Health & Sports",
                    Rating = 4,
                    ReviewCount = 1,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 1, 1),
                    UpdatedAt = new DateTime(2025, 1, 1)
                },

                // ── TELEVISIONS ──────────────────────────────────────────

                // 3 - Rangs TV (actual TV photo)
                new Product
                {
                    Id = 3,
                    Name = "Rangs 43 Inch Frameless Android TV",
                    Description = "43-inch Full HD Android Smart TV with frameless design. Built-in Chromecast and Google Assistant.",
                    Price = 800,
                    DiscountedPrice = 700,
                    DiscountPercent = 13,
                    Quantity = 30,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80",
                    Category = "Televisions",
                    Rating = 4.5m,
                    ReviewCount = 1,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 2,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 1, 1),
                    UpdatedAt = new DateTime(2025, 1, 1)
                },

                // ── GAMES & VIDEOS ────────────────────────────────────────

                // 4 - Noise Cancelling Headphone (actual headphone on-ear photo)
                new Product
                {
                    Id = 4,
                    Name = "True Wireless Noise Cancelling Headphone",
                    Description = "Premium ANC headphones with 30hr battery life and Hi-Res audio support.",
                    Price = 930,
                    DiscountedPrice = 899,
                    DiscountPercent = 3,
                    Quantity = 100,
                    Colors = "black,blue",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
                        { "blue",    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
                    Category = "Games & Videos",
                    Rating = 5,
                    ReviewCount = 1,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 5,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 1, 1),
                    UpdatedAt = new DateTime(2025, 1, 1)
                },

                // ── LAPTOP & PC ───────────────────────────────────────────

                // 5 - MacBook Pro M4 (space gray macbook photo)
                new Product
                {
                    Id = 5,
                    Name = "Macbook Pro M4 Pro - 512/16GB",
                    Description = "Apple MacBook Pro with M4 Pro chip, 16GB RAM, 512GB SSD. Incredible performance for professionals.",
                    Price = 500,
                    DiscountedPrice = 450,
                    DiscountPercent = 10,
                    Quantity = 15,
                    Colors = "gray,black",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 4.5m,
                    ReviewCount = 2,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 1,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 1, 1),
                    UpdatedAt = new DateTime(2025, 1, 1)
                },

                // ── WATCHES ──────────────────────────────────────────────

                // 6 - Apple Watch Ultra (actual smartwatch photo)
                new Product
                {
                    Id = 6,
                    Name = "Apple Watch Ultra",
                    Description = "Aerospace-grade titanium Apple Watch Ultra with action button and precision dual-frequency GPS.",
                    Price = 99,
                    DiscountedPrice = 89,
                    DiscountPercent = 10,
                    Quantity = 40,
                    Colors = "gray,orange",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80" },
                        { "orange",  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80",
                    Category = "Watches",
                    Rating = 3,
                    ReviewCount = 1,
                    FreeDelivery = true,
                    FastDelivery = true,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 1,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 1, 1),
                    UpdatedAt = new DateTime(2025, 1, 1)
                },

                // 7 - MacBook Air M4 (silver macbook air photo)
                new Product
                {
                    Id = 7,
                    Name = "MacBook Air M4 chip, 16/256GB",
                    Description = "Supercharged by M4. The thinnest, lightest Mac ever made with all-day battery life.",
                    Price = 699,
                    DiscountedPrice = 600,
                    DiscountPercent = 14,
                    Quantity = 25,
                    Colors = "gray,white",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1611186871525-4de78d02cd32?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1611186871525-4de78d02cd32?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1611186871525-4de78d02cd32?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 3.5m,
                    ReviewCount = 1,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 1,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 1, 1),
                    UpdatedAt = new DateTime(2025, 1, 1)
                },

                // 8 - iMac M4 (actual iMac desktop photo)
                new Product
                {
                    Id = 8,
                    Name = "Apple iMac M4 24-inch 2025",
                    Description = "Stunning 24-inch 4.5K Retina display iMac powered by M4. Available in multiple colors.",
                    Price = 555,
                    DiscountedPrice = 333,
                    DiscountPercent = 40,
                    Quantity = 10,
                    Colors = "gray,blue",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
                        { "blue",    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 2.5m,
                    ReviewCount = 2,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 1,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 1, 1),
                    UpdatedAt = new DateTime(2025, 1, 1)
                },

                // ── MOBILE & TABLETS ──────────────────────────────────────

                // 9 - iPhone 16 Pro (actual iPhone in hand photo)
                new Product
                {
                    Id = 9,
                    Name = "iPhone 16 Pro - 8/128GB",
                    Description = "iPhone 16 Pro with A18 Pro chip, ProMotion display, 48MP camera system.",
                    Price = 899,
                    DiscountedPrice = 600,
                    DiscountPercent = 33,
                    Quantity = 60,
                    Colors = "black,white",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1581993192008-63e896f4f744?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80",
                    Category = "Mobile & Tablets",
                    Rating = 5,
                    ReviewCount = 1,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 1,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 1, 1),
                    UpdatedAt = new DateTime(2025, 1, 1)
                },

                // 10 - Havit Gamepad (actual game controller photo)
                new Product
                {
                    Id = 10,
                    Name = "Havit HV-G69 USB Gamepad",
                    Description = "Dual vibration USB gamepad compatible with PC and Android. Ergonomic design for long gaming sessions.",
                    Price = 54,
                    DiscountedPrice = 26,
                    DiscountPercent = 52,
                    Quantity = 200,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&q=80",
                    Category = "Games & Videos",
                    Rating = 4.5m,
                    ReviewCount = 1,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 3,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 1, 1),
                    UpdatedAt = new DateTime(2025, 1, 1)
                },

                // 11 - Samsung Galaxy S24 Ultra (actual android phone photo)
                new Product
                {
                    Id = 11,
                    Name = "Samsung Galaxy S24 Ultra",
                    Description = "200MP camera, titanium frame, built-in S Pen, 5000mAh battery, 12GB RAM.",
                    Price = 1299,
                    DiscountedPrice = 1099,
                    DiscountPercent = 15,
                    Quantity = 40,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80",
                    Category = "Mobile & Tablets",
                    Rating = 4.7m,
                    ReviewCount = 2,
                    FreeDelivery = true,
                    FastDelivery = true,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 4,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 2, 1),
                    UpdatedAt = new DateTime(2025, 2, 1)
                },

                // 12 - Sony WH-1000XM5 (actual over-ear headphone photo)
                new Product
                {
                    Id = 12,
                    Name = "Sony WH-1000XM5 Wireless Headphones",
                    Description = "Industry-leading noise cancellation, 30hr battery, multipoint connection, crystal clear calls.",
                    Price = 399,
                    DiscountedPrice = 279,
                    DiscountPercent = 30,
                    Quantity = 80,
                    Colors = "black,white",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80",
                    Category = "Games & Videos",
                    Rating = 4.8m,
                    ReviewCount = 2,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 5,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 2, 1),
                    UpdatedAt = new DateTime(2025, 2, 1)
                },

                // 13 - Dell XPS 15 (actual laptop photo - open laptop)
                new Product
                {
                    Id = 13,
                    Name = "Dell XPS 15 OLED - Intel i9 32GB",
                    Description = "15.6-inch 3.5K OLED display, Intel Core i9, RTX 4060, 32GB RAM, 1TB SSD.",
                    Price = 2199,
                    DiscountedPrice = 1899,
                    DiscountPercent = 14,
                    Quantity = 12,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 4.6m,
                    ReviewCount = 1,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 6,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 2, 1),
                    UpdatedAt = new DateTime(2025, 2, 1)
                },

                // 14 - iPad Pro M4 (actual tablet photo)
                new Product
                {
                    Id = 14,
                    Name = "Apple iPad Pro M4 - 11 inch 256GB",
                    Description = "Ultra Retina XDR display, M4 chip, Apple Pencil Pro compatible, 10hr battery.",
                    Price = 999,
                    DiscountedPrice = 899,
                    DiscountPercent = 10,
                    Quantity = 25,
                    Colors = "gray,black",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
                    Category = "Mobile & Tablets",
                    Rating = 4.9m,
                    ReviewCount = 2,
                    FreeDelivery = true,
                    FastDelivery = true,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 1,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 2, 1),
                    UpdatedAt = new DateTime(2025, 2, 1)
                },

                // 15 - Samsung 55" QLED TV (large screen TV photo)
                new Product
                {
                    Id = 15,
                    Name = "Samsung 55 Inch QLED 4K Smart TV",
                    Description = "Quantum HDR, Motion Xcelerator 120Hz, Object Tracking Sound, Alexa built-in.",
                    Price = 1299,
                    DiscountedPrice = 999,
                    DiscountPercent = 23,
                    Quantity = 18,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&q=80",
                    Category = "Televisions",
                    Rating = 4.5m,
                    ReviewCount = 1,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 4,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 2, 1),
                    UpdatedAt = new DateTime(2025, 2, 1)
                },

                // 16 - Garmin Watch (actual watch on wrist photo)
                new Product
                {
                    Id = 16,
                    Name = "Garmin Forerunner 265 GPS Running Watch",
                    Description = "AMOLED display, advanced running dynamics, training readiness score, up to 15-day battery.",
                    Price = 449,
                    DiscountedPrice = 379,
                    DiscountPercent = 16,
                    Quantity = 35,
                    Colors = "black,blue",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
                        { "blue",    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
                    Category = "Watches",
                    Rating = 4.6m,
                    ReviewCount = 1,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 8,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 2, 1),
                    UpdatedAt = new DateTime(2025, 2, 1)
                },

                // 17 - Dyson V15 (vacuum cleaner photo)
                new Product
                {
                    Id = 17,
                    Name = "Dyson V15 Detect Cordless Vacuum",
                    Description = "Laser detects invisible dust, HEPA filtration, 60min runtime, automatic suction adjustment.",
                    Price = 749,
                    DiscountedPrice = 649,
                    DiscountPercent = 13,
                    Quantity = 22,
                    Colors = "black,blue",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
                        { "blue",    "https://images.unsplash.com/photo-1527515637462-cff94aca2e0b?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
                    Category = "Home Appliances",
                    Rating = 4.7m,
                    ReviewCount = 1,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 7,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 2, 1),
                    UpdatedAt = new DateTime(2025, 2, 1)
                },

                // 18 - PS5 DualSense (actual PS5 controller photo)
                new Product
                {
                    Id = 18,
                    Name = "Sony DualSense PS5 Wireless Controller",
                    Description = "Haptic feedback, adaptive triggers, built-in microphone, USB-C charging, 12hr battery.",
                    Price = 89,
                    DiscountedPrice = 69,
                    DiscountPercent = 22,
                    Quantity = 150,
                    Colors = "white,black",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80",
                    Category = "Games & Videos",
                    Rating = 4.8m,
                    ReviewCount = 2,
                    FreeDelivery = true,
                    FastDelivery = true,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 5,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 2, 1),
                    UpdatedAt = new DateTime(2025, 2, 1)
                },

                // 19 - Google Pixel 8 Pro (android smartphone photo)
                new Product
                {
                    Id = 19,
                    Name = "Google Pixel 8 Pro - 12GB 256GB",
                    Description = "Google Tensor G3 chip, 50MP triple camera, 7 years of OS updates, 30W fast charging.",
                    Price = 999,
                    DiscountedPrice = 799,
                    DiscountPercent = 20,
                    Quantity = 30,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
                    Category = "Mobile & Tablets",
                    Rating = 4.5m,
                    ReviewCount = 1,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 2, 1),
                    UpdatedAt = new DateTime(2025, 2, 1)
                },

                // 20 - Logitech MX Master 3S (actual wireless mouse photo)
                new Product
                {
                    Id = 20,
                    Name = "Logitech MX Master 3S Wireless Mouse",
                    Description = "8K DPI sensor, quiet clicks, MagSpeed electromagnetic scroll, ergonomic design, USB-C.",
                    Price = 99,
                    DiscountedPrice = 79,
                    DiscountPercent = 20,
                    Quantity = 120,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 4.9m,
                    ReviewCount = 2,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 9,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 2, 1),
                    UpdatedAt = new DateTime(2025, 2, 1)
                },

                // 21 - Sony Bravia TV (TV photo)
                new Product
                {
                    Id = 21,
                    Name = "Sony Bravia 55 inch 4K OLED TV",
                    Description = "Sony OLED 4K TV with Cognitive Processor XR, Acoustic Surface Audio, and Google TV.",
                    Price = 1799,
                    DiscountedPrice = 1499,
                    DiscountPercent = 17,
                    Quantity = 15,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80",
                    Category = "Televisions",
                    Rating = 4.7m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 5,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 1),
                    UpdatedAt = new DateTime(2025, 3, 1)
                },

                // 22 - AirPods Pro 2 (actual earbuds/airpods photo)
                new Product
                {
                    Id = 22,
                    Name = "Apple AirPods Pro 2nd Generation",
                    Description = "Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio with H2 chip.",
                    Price = 249,
                    DiscountedPrice = 199,
                    DiscountPercent = 20,
                    Quantity = 90,
                    Colors = "white,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80",
                    Category = "Games & Videos",
                    Rating = 4.8m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = true,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 1,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 1),
                    UpdatedAt = new DateTime(2025, 3, 1)
                },

                // 23 - Samsung Galaxy Tab S9 (tablet photo)
                new Product
                {
                    Id = 23,
                    Name = "Samsung Galaxy Tab S9 Ultra 14.6 inch",
                    Description = "14.6 inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, 12GB RAM, S Pen included.",
                    Price = 1199,
                    DiscountedPrice = 999,
                    DiscountPercent = 17,
                    Quantity = 20,
                    Colors = "gray,black",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
                    Category = "Mobile & Tablets",
                    Rating = 4.6m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 4,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 1),
                    UpdatedAt = new DateTime(2025, 3, 1)
                },

                // 24 - Logitech G Pro Keyboard (mechanical keyboard photo)
                new Product
                {
                    Id = 24,
                    Name = "Logitech G Pro X Mechanical Gaming Keyboard",
                    Description = "Tenkeyless design, hot-swappable switches, RGB LIGHTSYNC, tournament grade.",
                    Price = 149,
                    DiscountedPrice = 119,
                    DiscountPercent = 20,
                    Quantity = 60,
                    Colors = "black,white",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 4.7m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 9,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 1),
                    UpdatedAt = new DateTime(2025, 3, 1)
                },

                // 25 - Fitbit Charge 6 (fitness band/smartwatch photo)
                new Product
                {
                    Id = 25,
                    Name = "Fitbit Charge 6 Fitness Tracker",
                    Description = "Built-in GPS, heart rate monitoring, 7-day battery, Google Maps and Wallet support.",
                    Price = 159,
                    DiscountedPrice = 129,
                    DiscountPercent = 19,
                    Quantity = 75,
                    Colors = "black,blue",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
                        { "blue",    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
                    Category = "Watches",
                    Rating = 4.3m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 1),
                    UpdatedAt = new DateTime(2025, 3, 1)
                },

                // 26 - HP Spectre x360 (laptop photo)
                new Product
                {
                    Id = 26,
                    Name = "HP Spectre x360 14 inch 2-in-1 Laptop",
                    Description = "Intel Core Ultra 7, 16GB RAM, 1TB SSD, 2.8K OLED touchscreen, 360 degree hinge.",
                    Price = 1499,
                    DiscountedPrice = 1299,
                    DiscountPercent = 13,
                    Quantity = 18,
                    Colors = "black,blue",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
                        { "blue",    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 4.5m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 2),
                    UpdatedAt = new DateTime(2025, 3, 2)
                },

                // 27 - LG 27 inch Monitor (computer monitor photo)
                new Product
                {
                    Id = 27,
                    Name = "LG UltraFine 27 inch 4K USB-C Monitor",
                    Description = "3840x2160 IPS display, 96W USB-C charging, HDR400, factory calibrated.",
                    Price = 699,
                    DiscountedPrice = 549,
                    DiscountPercent = 21,
                    Quantity = 30,
                    Colors = "gray,white",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 4.6m,
                    ReviewCount = 0,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 2),
                    UpdatedAt = new DateTime(2025, 3, 2)
                },

                // 28 - Samsung Galaxy Watch 6 (smartwatch photo)
                new Product
                {
                    Id = 28,
                    Name = "Samsung Galaxy Watch 6 Classic 47mm",
                    Description = "Rotating bezel, advanced health tracking, BioActive sensor, 40hr battery life.",
                    Price = 399,
                    DiscountedPrice = 329,
                    DiscountPercent = 18,
                    Quantity = 45,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80",
                    Category = "Watches",
                    Rating = 4.4m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 4,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 2),
                    UpdatedAt = new DateTime(2025, 3, 2)
                },

                // 29 - OnePlus 12 (smartphone photo)
                new Product
                {
                    Id = 29,
                    Name = "OnePlus 12 16GB 512GB",
                    Description = "Snapdragon 8 Gen 3, Hasselblad tuned triple camera, 100W SuperVOOC charging, 5400mAh.",
                    Price = 799,
                    DiscountedPrice = 649,
                    DiscountPercent = 19,
                    Quantity = 35,
                    Colors = "black,green",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80" },
                        { "green",   "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80",
                    Category = "Mobile & Tablets",
                    Rating = 4.5m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = true,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 2),
                    UpdatedAt = new DateTime(2025, 3, 2)
                },

                // 30 - Bose QC45 (over-ear headphone photo)
                new Product
                {
                    Id = 30,
                    Name = "Bose QuietComfort 45 Wireless Headphones",
                    Description = "World-class noise cancellation, high-fidelity audio, 24hr battery, comfortable design.",
                    Price = 329,
                    DiscountedPrice = 249,
                    DiscountPercent = 24,
                    Quantity = 55,
                    Colors = "black,white",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
                    Category = "Games & Videos",
                    Rating = 4.7m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 2),
                    UpdatedAt = new DateTime(2025, 3, 2)
                },

                // 31 - Robot Vacuum (robotic vacuum cleaner photo)
                new Product
                {
                    Id = 31,
                    Name = "Xiaomi Robot Vacuum S10 Pro",
                    Description = "4000Pa suction, LiDAR navigation, auto-empty base, mop function, 3hr runtime.",
                    Price = 499,
                    DiscountedPrice = 399,
                    DiscountPercent = 20,
                    Quantity = 25,
                    Colors = "white,black",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1527515637462-cff94aca2e0b?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
                    Category = "Home Appliances",
                    Rating = 4.4m,
                    ReviewCount = 0,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 3),
                    UpdatedAt = new DateTime(2025, 3, 3)
                },

                // 32 - Microsoft Surface Pro 9 (tablet/laptop hybrid photo)
                new Product
                {
                    Id = 32,
                    Name = "Microsoft Surface Pro 9 Intel i7 16GB",
                    Description = "13 inch PixelSense Flow touchscreen, Intel Evo i7, 16GB RAM, all-day battery.",
                    Price = 1599,
                    DiscountedPrice = 1399,
                    DiscountPercent = 13,
                    Quantity = 14,
                    Colors = "gray,blue",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80" },
                        { "blue",    "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 4.3m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 3),
                    UpdatedAt = new DateTime(2025, 3, 3)
                },

                // 33 - Nothing Phone 2 (transparent back phone photo)
                new Product
                {
                    Id = 33,
                    Name = "Nothing Phone 2 12GB 256GB",
                    Description = "Unique Glyph Interface lighting, Snapdragon 8+ Gen 1, 50MP dual camera, 4700mAh.",
                    Price = 699,
                    DiscountedPrice = 579,
                    DiscountPercent = 17,
                    Quantity = 30,
                    Colors = "white,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1581993192008-63e896f4f744?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1581993192008-63e896f4f744?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1581993192008-63e896f4f744?w=400&q=80",
                    Category = "Mobile & Tablets",
                    Rating = 4.2m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 3),
                    UpdatedAt = new DateTime(2025, 3, 3)
                },

                // 34 - Asus ROG Gaming Laptop (gaming laptop photo)
                new Product
                {
                    Id = 34,
                    Name = "Asus ROG Strix G16 RTX 4070 Gaming Laptop",
                    Description = "Intel i9 13th Gen, RTX 4070, 16GB DDR5, 1TB NVMe, 240Hz QHD display.",
                    Price = 2499,
                    DiscountedPrice = 2099,
                    DiscountPercent = 16,
                    Quantity = 10,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 4.8m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 3),
                    UpdatedAt = new DateTime(2025, 3, 3)
                },

                // 35 - Canon EOS R50 (actual camera photo)
                new Product
                {
                    Id = 35,
                    Name = "Canon EOS R50 Mirrorless Camera Body",
                    Description = "24.2MP APS-C sensor, 4K video, Dual Pixel CMOS AF II, Wi-Fi, lightweight body.",
                    Price = 699,
                    DiscountedPrice = 599,
                    DiscountPercent = 14,
                    Quantity = 20,
                    Colors = "black,white",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
                    Category = "Games & Videos",
                    Rating = 4.6m,
                    ReviewCount = 0,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 4),
                    UpdatedAt = new DateTime(2025, 3, 4)
                },

                // 36 - Rowing Machine (actual rowing machine gym photo)
                new Product
                {
                    Id = 36,
                    Name = "Concept2 Model D Indoor Rowing Machine",
                    Description = "Performance Monitor 5, smooth chain drive, adjustable footrests, folds for storage.",
                    Price = 999,
                    DiscountedPrice = 849,
                    DiscountPercent = 15,
                    Quantity = 12,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
                    Category = "Health & Sports",
                    Rating = 4.9m,
                    ReviewCount = 0,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 4),
                    UpdatedAt = new DateTime(2025, 3, 4)
                },

                // 37 - Nest Thermostat (smart home device/thermostat photo)
                new Product
                {
                    Id = 37,
                    Name = "Google Nest Learning Thermostat 4th Gen",
                    Description = "Auto-schedule, Energy Star certified, works with Alexa and Google Assistant, OLED display.",
                    Price = 279,
                    DiscountedPrice = 229,
                    DiscountPercent = 18,
                    Quantity = 40,
                    Colors = "black,white",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1527515637462-cff94aca2e0b?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1527515637462-cff94aca2e0b?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1527515637462-cff94aca2e0b?w=400&q=80",
                    Category = "Home Appliances",
                    Rating = 4.5m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 4),
                    UpdatedAt = new DateTime(2025, 3, 4)
                },

                // 38 - Razer DeathAdder V3 (gaming mouse photo)
                new Product
                {
                    Id = 38,
                    Name = "Razer DeathAdder V3 Pro Wireless Mouse",
                    Description = "30K DPI optical sensor, 90hr battery, Focus Pro sensor, ultra-lightweight 64g design.",
                    Price = 149,
                    DiscountedPrice = 119,
                    DiscountPercent = 20,
                    Quantity = 80,
                    Colors = "black,white",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 4.7m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 4),
                    UpdatedAt = new DateTime(2025, 3, 4)
                },

                // 39 - iPhone 15 (iPhone photo)
                new Product
                {
                    Id = 39,
                    Name = "iPhone 15 6GB 128GB",
                    Description = "A16 Bionic chip, 48MP main camera, Dynamic Island, USB-C, all-day battery life.",
                    Price = 799,
                    DiscountedPrice = 699,
                    DiscountPercent = 13,
                    Quantity = 50,
                    Colors = "black,blue",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80" },
                        { "blue",    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80",
                    Category = "Mobile & Tablets",
                    Rating = 4.6m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = true,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 1,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 5),
                    UpdatedAt = new DateTime(2025, 3, 5)
                },

                // 40 - NutriBullet Blender (kitchen blender photo)
                new Product
                {
                    Id = 40,
                    Name = "NutriBullet Pro 900W Personal Blender",
                    Description = "900W motor, 32oz cup, stainless steel blades, dishwasher safe, perfect for smoothies.",
                    Price = 89,
                    DiscountedPrice = 69,
                    DiscountPercent = 22,
                    Quantity = 100,
                    Colors = "gray,black",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80",
                    Category = "Home Appliances",
                    Rating = 4.4m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 5),
                    UpdatedAt = new DateTime(2025, 3, 5)
                },

                // 41 - Nintendo Switch OLED (gaming console photo)
                new Product
                {
                    Id = 41,
                    Name = "Nintendo Switch OLED Model White",
                    Description = "7 inch OLED screen, enhanced audio, 64GB storage, LAN port, wide adjustable stand.",
                    Price = 349,
                    DiscountedPrice = 319,
                    DiscountPercent = 9,
                    Quantity = 35,
                    Colors = "white,black",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80",
                    Category = "Games & Videos",
                    Rating = 4.8m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = true,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 5),
                    UpdatedAt = new DateTime(2025, 3, 5)
                },

                // 42 - Lenovo ThinkPad X1 Carbon (business laptop photo)
                new Product
                {
                    Id = 42,
                    Name = "Lenovo ThinkPad X1 Carbon Gen 11",
                    Description = "Intel Core i7 13th Gen, 16GB RAM, 512GB SSD, 14 inch 2.8K OLED, MIL-SPEC durability.",
                    Price = 1799,
                    DiscountedPrice = 1549,
                    DiscountPercent = 14,
                    Quantity = 12,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1611186871525-4de78d02cd32?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 4.7m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 5),
                    UpdatedAt = new DateTime(2025, 3, 5)
                },

                // 43 - Xiaomi Mi Band 8 (fitness band photo)
                new Product
                {
                    Id = 43,
                    Name = "Xiaomi Smart Band 8 Fitness Tracker",
                    Description = "1.62 inch AMOLED, 16-day battery, 150 workout modes, SpO2 and heart rate monitoring.",
                    Price = 49,
                    DiscountedPrice = 35,
                    DiscountPercent = 29,
                    Quantity = 200,
                    Colors = "black,orange",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
                        { "orange",  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
                    Category = "Watches",
                    Rating = 4.2m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = true,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 6),
                    UpdatedAt = new DateTime(2025, 3, 6)
                },

                // 44 - Sony A7 IV (professional camera photo)
                new Product
                {
                    Id = 44,
                    Name = "Sony Alpha A7 IV Full Frame Mirrorless",
                    Description = "33MP BSI-CMOS sensor, 4K 60fps video, 759 phase-detect AF points, dual card slots.",
                    Price = 2499,
                    DiscountedPrice = 2199,
                    DiscountPercent = 12,
                    Quantity = 8,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
                    Category = "Games & Videos",
                    Rating = 4.9m,
                    ReviewCount = 0,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 5,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 6),
                    UpdatedAt = new DateTime(2025, 3, 6)
                },

                // 45 - Bowflex Dumbbells (adjustable dumbbells/weights photo)
                new Product
                {
                    Id = 45,
                    Name = "Bowflex SelectTech 552 Adjustable Dumbbells",
                    Description = "Adjusts from 5 to 52.5 lbs, replaces 15 sets of weights, dials select the weight.",
                    Price = 429,
                    DiscountedPrice = 349,
                    DiscountPercent = 19,
                    Quantity = 22,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
                    Category = "Health & Sports",
                    Rating = 4.8m,
                    ReviewCount = 0,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 6),
                    UpdatedAt = new DateTime(2025, 3, 6)
                },

                // 46 - TCL 65 inch TV (TV photo)
                new Product
                {
                    Id = 46,
                    Name = "TCL 65 inch 4K QLED Smart TV",
                    Description = "QLED color technology, Dolby Vision IQ, 120Hz refresh rate, Google TV built-in.",
                    Price = 799,
                    DiscountedPrice = 649,
                    DiscountPercent = 19,
                    Quantity = 20,
                    Colors = "black,gray",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&q=80",
                    Category = "Televisions",
                    Rating = 4.4m,
                    ReviewCount = 0,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 7),
                    UpdatedAt = new DateTime(2025, 3, 7)
                },

                // 47 - Instant Pot Duo (pressure cooker/kitchen appliance photo)
                new Product
                {
                    Id = 47,
                    Name = "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
                    Description = "Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, warmer. 6 quart.",
                    Price = 99,
                    DiscountedPrice = 79,
                    DiscountPercent = 20,
                    Quantity = 80,
                    Colors = "gray,black",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80" },
                        { "gray",    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80",
                    Category = "Home Appliances",
                    Rating = 4.7m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 7),
                    UpdatedAt = new DateTime(2025, 3, 7)
                },

                // 48 - Razer BlackShark V2 Pro (gaming headset photo)
                new Product
                {
                    Id = 48,
                    Name = "Razer BlackShark V2 Pro Wireless Headset",
                    Description = "THX 7.1 Spatial Audio, TriForce Titanium 50mm drivers, HyperClear mic, 70hr battery.",
                    Price = 199,
                    DiscountedPrice = 159,
                    DiscountPercent = 20,
                    Quantity = 45,
                    Colors = "black,white",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80",
                    Category = "Games & Videos",
                    Rating = 4.6m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 10,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 7),
                    UpdatedAt = new DateTime(2025, 3, 7)
                },

                // 49 - Apple Watch Series 9 (apple watch photo)
                new Product
                {
                    Id = 49,
                    Name = "Apple Watch Series 9 45mm GPS",
                    Description = "S9 SiP chip, Double Tap gesture, Always-On Retina display, carbon neutral, 18hr battery.",
                    Price = 429,
                    DiscountedPrice = 379,
                    DiscountPercent = 12,
                    Quantity = 55,
                    Colors = "black,orange",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80" },
                        { "orange",  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80",
                    Category = "Watches",
                    Rating = 4.7m,
                    ReviewCount = 0,
                    FreeDelivery = true,
                    FastDelivery = true,
                    HasPromo = false,
                    IsActive = true,
                    BrandId = 1,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 7),
                    UpdatedAt = new DateTime(2025, 3, 7)
                },

                // 50 - Samsung 49 inch Ultrawide Monitor (ultrawide monitor photo)
                new Product
                {
                    Id = 50,
                    Name = "Samsung 49 inch Odyssey G9 Curved Gaming Monitor",
                    Description = "Dual QHD 5120x1440, 240Hz, 1ms, QLED, G-Sync + FreeSync, immersive 1000R curve.",
                    Price = 1499,
                    DiscountedPrice = 1199,
                    DiscountPercent = 20,
                    Quantity = 10,
                    Colors = "white,black",
                    ColorImages = JsonSerializer.Serialize(new Dictionary<string, string> {
                        { "default", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
                        { "white",   "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
                        { "black",   "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" }
                    }),
                    DefaultImage = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
                    Category = "Laptop & PC",
                    Rating = 4.8m,
                    ReviewCount = 0,
                    FreeDelivery = false,
                    FastDelivery = false,
                    HasPromo = true,
                    IsActive = true,
                    BrandId = 4,
                    UserId = 2,
                    CreatedAt = new DateTime(2025, 3, 7),
                    UpdatedAt = new DateTime(2025, 3, 7)
                }
            );

            // ── Seed Reviews ──────────────────────────────────────────────
            modelBuilder.Entity<Review>().HasData(
                new Review { Id = 1, ProductId = 1, UserId = 3, Rating = 1, Comment = "Not worth the price. Motor noise is too loud.", CreatedAt = new DateTime(2025, 3, 1) },
                new Review { Id = 2, ProductId = 1, UserId = 5, Rating = 1, Comment = "Stopped working after 2 weeks.", CreatedAt = new DateTime(2025, 3, 5) },
                new Review { Id = 3, ProductId = 2, UserId = 4, Rating = 4, Comment = "Great treadmill for home use! Very quiet motor.", CreatedAt = new DateTime(2025, 3, 2) },
                new Review { Id = 4, ProductId = 3, UserId = 7, Rating = 4.5m, Comment = "Picture quality is stunning. Google Assistant works great.", CreatedAt = new DateTime(2025, 3, 3) },
                new Review { Id = 5, ProductId = 4, UserId = 3, Rating = 5, Comment = "Best headphones I have ever used. ANC is phenomenal!", CreatedAt = new DateTime(2025, 3, 1) },
                new Review { Id = 6, ProductId = 5, UserId = 8, Rating = 5, Comment = "Blazing fast performance. Best laptop on the market.", CreatedAt = new DateTime(2025, 3, 2) },
                new Review { Id = 7, ProductId = 5, UserId = 9, Rating = 4, Comment = "Excellent build quality. Battery life could be better.", CreatedAt = new DateTime(2025, 3, 6) },
                new Review { Id = 8, ProductId = 6, UserId = 5, Rating = 3, Comment = "Good watch but overpriced. The titanium feels great though.", CreatedAt = new DateTime(2025, 3, 4) },
                new Review { Id = 9, ProductId = 7, UserId = 3, Rating = 3.5m, Comment = "Very thin and light. Perfect for daily work.", CreatedAt = new DateTime(2025, 3, 5) },
                new Review { Id = 10, ProductId = 8, UserId = 7, Rating = 2, Comment = "Beautiful design but not worth the cost.", CreatedAt = new DateTime(2025, 3, 1) },
                new Review { Id = 11, ProductId = 8, UserId = 4, Rating = 3, Comment = "Display is amazing. Setup was easy.", CreatedAt = new DateTime(2025, 3, 7) },
                new Review { Id = 12, ProductId = 9, UserId = 6, Rating = 5, Comment = "Best iPhone ever! Camera is insane.", CreatedAt = new DateTime(2025, 3, 3) },
                new Review { Id = 13, ProductId = 10, UserId = 9, Rating = 4.5m, Comment = "Great gamepad for the price. Vibration feedback is solid.", CreatedAt = new DateTime(2025, 3, 4) },
                new Review { Id = 14, ProductId = 11, UserId = 3, Rating = 5, Comment = "S Pen makes this phone unique. Camera is top tier.", CreatedAt = new DateTime(2025, 3, 5) },
                new Review { Id = 15, ProductId = 11, UserId = 7, Rating = 4.4m, Comment = "Battery life is excellent. Performance is smooth.", CreatedAt = new DateTime(2025, 3, 6) },
                new Review { Id = 16, ProductId = 12, UserId = 5, Rating = 5, Comment = "Sound quality is unmatched. ANC is best in class.", CreatedAt = new DateTime(2025, 3, 1) },
                new Review { Id = 17, ProductId = 12, UserId = 8, Rating = 4.5m, Comment = "Very comfortable for long listening sessions.", CreatedAt = new DateTime(2025, 3, 3) },
                new Review { Id = 18, ProductId = 13, UserId = 4, Rating = 4.6m, Comment = "OLED display is gorgeous. RTX 4060 handles everything.", CreatedAt = new DateTime(2025, 3, 2) },
                new Review { Id = 19, ProductId = 14, UserId = 6, Rating = 5, Comment = "M4 chip is overkill in a good way. Display is gorgeous.", CreatedAt = new DateTime(2025, 3, 4) },
                new Review { Id = 20, ProductId = 14, UserId = 9, Rating = 4.8m, Comment = "Best tablet available. Apple Pencil integration is seamless.", CreatedAt = new DateTime(2025, 3, 7) },
                new Review { Id = 21, ProductId = 15, UserId = 3, Rating = 4.5m, Comment = "Quantum HDR makes movies pop. Alexa integration is useful.", CreatedAt = new DateTime(2025, 3, 6) },
                new Review { Id = 22, ProductId = 16, UserId = 5, Rating = 4.6m, Comment = "Running metrics are incredibly detailed. Battery lasts 15 days!", CreatedAt = new DateTime(2025, 3, 5) },
                new Review { Id = 23, ProductId = 17, UserId = 7, Rating = 4.7m, Comment = "Laser detection is amazing. Picks up dust I couldn't see.", CreatedAt = new DateTime(2025, 3, 3) },
                new Review { Id = 24, ProductId = 18, UserId = 4, Rating = 5, Comment = "Haptic feedback completely changes gaming. DualSense is phenomenal.", CreatedAt = new DateTime(2025, 3, 2) },
                new Review { Id = 25, ProductId = 18, UserId = 8, Rating = 4.5m, Comment = "Adaptive triggers add immersion. Battery life is decent.", CreatedAt = new DateTime(2025, 3, 5) },
                new Review { Id = 26, ProductId = 19, UserId = 6, Rating = 4.5m, Comment = "Google AI features are impressive. Camera is outstanding.", CreatedAt = new DateTime(2025, 3, 4) },
                new Review { Id = 27, ProductId = 20, UserId = 3, Rating = 5, Comment = "Best mouse I have ever used. MagSpeed scrolling is addictive.", CreatedAt = new DateTime(2025, 3, 1) },
                new Review { Id = 28, ProductId = 20, UserId = 9, Rating = 4.8m, Comment = "Ergonomics are perfect. Quiet clicks are a game changer in office.", CreatedAt = new DateTime(2025, 3, 6) }
            );
        }
    }
}