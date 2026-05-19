using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EcommerceApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Image = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phone = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneCode = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsAdmin = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsSeller = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsBuyer = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: true)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "varchar(2000)", maxLength: 2000, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    DiscountedPrice = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    DiscountPercent = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Colors = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ColorImages = table.Column<string>(type: "varchar(2000)", maxLength: 2000, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DefaultImage = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Category = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Rating = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ReviewCount = table.Column<int>(type: "int", nullable: false),
                    FreeDelivery = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FastDelivery = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    HasPromo = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    BrandId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Brands_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Products_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Comment = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Rating = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Brands",
                columns: new[] { "Id", "CreatedAt", "Description", "Image", "IsActive", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Premium Apple products", null, true, "Apple" },
                    { 2, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Electronics brand", null, true, "Rangs Electronics" },
                    { 3, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gaming accessories", null, true, "Havit" },
                    { 4, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Samsung Electronics", null, true, "Samsung" },
                    { 5, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sony Electronics", null, true, "Sony" },
                    { 6, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Dell Technologies", null, true, "Dell" },
                    { 7, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Dyson Home Appliances", null, true, "Dyson" },
                    { 8, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Garmin Wearables", null, true, "Garmin" },
                    { 9, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Logitech Peripherals", null, true, "Logitech" },
                    { 10, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "General products", null, true, "Generic" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedAt", "Email", "IsAdmin", "IsBuyer", "IsSeller", "Name", "PasswordHash", "Phone", "PhoneCode", "Status" },
                values: new object[,]
                {
                    { 1, "Kathmandu", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "shubham@gmail.com", true, false, false, "Shubham Ghimire", "hashed_password", "9800000001", "+977", "Approved" },
                    { 2, "Pokhara", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "aayush@gmail.com", false, false, true, "Aayush Sharma", "hashed_password", "9800000002", "+977", "Approved" },
                    { 3, "Lalitpur", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "rohan@gmail.com", false, true, false, "Rohan Karki", "hashed_password", "9800000003", "+977", "Approved" },
                    { 4, "Bhaktapur", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "suman@gmail.com", false, true, true, "Suman Thapa", "hashed_password", "9800000004", "+977", "Approved" },
                    { 5, "Chitwan", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "prakash@gmail.com", false, true, false, "Prakash Adhikari", "hashed_password", "9800000005", "+977", "Approved" },
                    { 6, "Butwal", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "bikash@gmail.com", false, false, true, "Bikash Gurung", "hashed_password", "9800000006", "+977", "Approved" },
                    { 7, "Dharan", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "nabin@gmail.com", false, true, false, "Nabin Shrestha", "hashed_password", "9800000007", "+977", "Approved" },
                    { 8, "Biratnagar", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "kiran@gmail.com", false, true, true, "Kiran Rai", "hashed_password", "9800000008", "+977", "Approved" },
                    { 9, "Janakpur", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "santosh@gmail.com", false, true, false, "Santosh Bhandari", "hashed_password", "9800000009", "+977", "Approved" },
                    { 10, "Kathmandu", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "dipesh@gmail.com", true, true, true, "Dipesh KC", "hashed_password", "9800000010", "+977", "Approved" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "BrandId", "Category", "ColorImages", "Colors", "CreatedAt", "DefaultImage", "Description", "DiscountPercent", "DiscountedPrice", "FastDelivery", "FreeDelivery", "HasPromo", "IsActive", "Name", "Price", "Quantity", "Rating", "ReviewCount", "UpdatedAt", "UserId" },
                values: new object[,]
                {
                    { 1, 10, "Home Appliances", "{\"default\":\"https://images.unsplash.com/photo-1585515320310-259814833e62?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1585515320310-259814833e62?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80", "High-performance portable electric grinder suitable for home use. Compact design with powerful motor.", 12, 777m, false, false, false, true, "Portable Electric Grinder Maker", 888m, 50, 1m, 2, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 2, 10, "Health & Sports", "{\"default\":\"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", "Foldable motorised treadmill for home workouts. Ultra-silent motor with adjustable speed settings.", 11, 888m, false, false, false, true, "Indoor Steel Adjustable Silent Treadmill", 999m, 20, 4m, 1, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 3, 2, "Televisions", "{\"default\":\"https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80", "43-inch Full HD Android Smart TV with frameless design. Built-in Chromecast and Google Assistant.", 13, 700m, false, false, false, true, "Rangs 43 Inch Frameless Android TV", 800m, 30, 4.5m, 1, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 4, 5, "Games & Videos", "{\"default\":\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\\u0026q=80\",\"blue\":\"https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400\\u0026q=80\"}", "black,blue", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", "Premium ANC headphones with 30hr battery life and Hi-Res audio support.", 3, 899m, false, true, true, true, "True Wireless Noise Cancelling Headphone", 930m, 100, 5m, 1, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 5, 1, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400\\u0026q=80\"}", "gray,black", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", "Apple MacBook Pro with M4 Pro chip, 16GB RAM, 512GB SSD. Incredible performance for professionals.", 10, 450m, false, true, true, true, "Macbook Pro M4 Pro - 512/16GB", 500m, 15, 4.5m, 2, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 6, 1, "Watches", "{\"default\":\"https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400\\u0026q=80\",\"orange\":\"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400\\u0026q=80\"}", "gray,orange", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80", "Aerospace-grade titanium Apple Watch Ultra with action button and precision dual-frequency GPS.", 10, 89m, true, true, false, true, "Apple Watch Ultra", 99m, 40, 3m, 1, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 7, 1, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1611186871525-4de78d02cd32?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1611186871525-4de78d02cd32?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400\\u0026q=80\"}", "gray,white", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1611186871525-4de78d02cd32?w=400&q=80", "Supercharged by M4. The thinnest, lightest Mac ever made with all-day battery life.", 14, 600m, false, true, true, true, "MacBook Air M4 chip, 16/256GB", 699m, 25, 3.5m, 1, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 8, 1, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400\\u0026q=80\",\"blue\":\"https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400\\u0026q=80\"}", "gray,blue", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80", "Stunning 24-inch 4.5K Retina display iMac powered by M4. Available in multiple colors.", 40, 333m, false, true, true, true, "Apple iMac M4 24-inch 2025", 555m, 10, 2.5m, 2, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 9, 1, "Mobile & Tablets", "{\"default\":\"https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1581993192008-63e896f4f744?w=400\\u0026q=80\"}", "black,white", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80", "iPhone 16 Pro with A18 Pro chip, ProMotion display, 48MP camera system.", 33, 600m, false, true, true, true, "iPhone 16 Pro - 8/128GB", 899m, 60, 5m, 1, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 10, 3, "Games & Videos", "{\"default\":\"https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&q=80", "Dual vibration USB gamepad compatible with PC and Android. Ergonomic design for long gaming sessions.", 52, 26m, false, true, true, true, "Havit HV-G69 USB Gamepad", 54m, 200, 4.5m, 1, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 11, 4, "Mobile & Tablets", "{\"default\":\"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80", "200MP camera, titanium frame, built-in S Pen, 5000mAh battery, 12GB RAM.", 15, 1099m, true, true, true, true, "Samsung Galaxy S24 Ultra", 1299m, 40, 4.7m, 2, new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 12, 5, "Games & Videos", "{\"default\":\"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400\\u0026q=80\"}", "black,white", new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80", "Industry-leading noise cancellation, 30hr battery, multipoint connection, crystal clear calls.", 30, 279m, false, true, true, true, "Sony WH-1000XM5 Wireless Headphones", 399m, 80, 4.8m, 2, new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 13, 6, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", "15.6-inch 3.5K OLED display, Intel Core i9, RTX 4060, 32GB RAM, 1TB SSD.", 14, 1899m, false, true, false, true, "Dell XPS 15 OLED - Intel i9 32GB", 2199m, 12, 4.6m, 1, new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 14, 1, "Mobile & Tablets", "{\"default\":\"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=400\\u0026q=80\"}", "gray,black", new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80", "Ultra Retina XDR display, M4 chip, Apple Pencil Pro compatible, 10hr battery.", 10, 899m, true, true, true, true, "Apple iPad Pro M4 - 11 inch 256GB", 999m, 25, 4.9m, 2, new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 15, 4, "Televisions", "{\"default\":\"https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&q=80", "Quantum HDR, Motion Xcelerator 120Hz, Object Tracking Sound, Alexa built-in.", 23, 999m, false, false, true, true, "Samsung 55 Inch QLED 4K Smart TV", 1299m, 18, 4.5m, 1, new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 16, 8, "Watches", "{\"default\":\"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400\\u0026q=80\",\"blue\":\"https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400\\u0026q=80\"}", "black,blue", new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", "AMOLED display, advanced running dynamics, training readiness score, up to 15-day battery.", 16, 379m, false, true, false, true, "Garmin Forerunner 265 GPS Running Watch", 449m, 35, 4.6m, 1, new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 17, 7, "Home Appliances", "{\"default\":\"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400\\u0026q=80\",\"blue\":\"https://images.unsplash.com/photo-1527515637462-cff94aca2e0b?w=400\\u0026q=80\"}", "black,blue", new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", "Laser detects invisible dust, HEPA filtration, 60min runtime, automatic suction adjustment.", 13, 649m, false, false, false, true, "Dyson V15 Detect Cordless Vacuum", 749m, 22, 4.7m, 1, new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 18, 5, "Games & Videos", "{\"default\":\"https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400\\u0026q=80\"}", "white,black", new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80", "Haptic feedback, adaptive triggers, built-in microphone, USB-C charging, 12hr battery.", 22, 69m, true, true, true, true, "Sony DualSense PS5 Wireless Controller", 89m, 150, 4.8m, 2, new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 19, 10, "Mobile & Tablets", "{\"default\":\"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80", "Google Tensor G3 chip, 50MP triple camera, 7 years of OS updates, 30W fast charging.", 20, 799m, false, true, true, true, "Google Pixel 8 Pro - 12GB 256GB", 999m, 30, 4.5m, 1, new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 20, 9, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80", "8K DPI sensor, quiet clicks, MagSpeed electromagnetic scroll, ergonomic design, USB-C.", 20, 79m, false, true, false, true, "Logitech MX Master 3S Wireless Mouse", 99m, 120, 4.9m, 2, new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 21, 5, "Televisions", "{\"default\":\"https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80", "Sony OLED 4K TV with Cognitive Processor XR, Acoustic Surface Audio, and Google TV.", 17, 1499m, false, true, true, true, "Sony Bravia 55 inch 4K OLED TV", 1799m, 15, 4.7m, 0, new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 22, 1, "Games & Videos", "{\"default\":\"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400\\u0026q=80\"}", "white,gray", new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80", "Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio with H2 chip.", 20, 199m, true, true, true, true, "Apple AirPods Pro 2nd Generation", 249m, 90, 4.8m, 0, new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 23, 4, "Mobile & Tablets", "{\"default\":\"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=400\\u0026q=80\"}", "gray,black", new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80", "14.6 inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, 12GB RAM, S Pen included.", 17, 999m, false, true, true, true, "Samsung Galaxy Tab S9 Ultra 14.6 inch", 1199m, 20, 4.6m, 0, new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 24, 9, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400\\u0026q=80\"}", "black,white", new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", "Tenkeyless design, hot-swappable switches, RGB LIGHTSYNC, tournament grade.", 20, 119m, false, true, false, true, "Logitech G Pro X Mechanical Gaming Keyboard", 149m, 60, 4.7m, 0, new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 25, 10, "Watches", "{\"default\":\"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400\\u0026q=80\",\"blue\":\"https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400\\u0026q=80\"}", "black,blue", new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", "Built-in GPS, heart rate monitoring, 7-day battery, Google Maps and Wallet support.", 19, 129m, false, true, false, true, "Fitbit Charge 6 Fitness Tracker", 159m, 75, 4.3m, 0, new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 26, 10, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400\\u0026q=80\",\"blue\":\"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400\\u0026q=80\"}", "black,blue", new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", "Intel Core Ultra 7, 16GB RAM, 1TB SSD, 2.8K OLED touchscreen, 360 degree hinge.", 13, 1299m, false, true, true, true, "HP Spectre x360 14 inch 2-in-1 Laptop", 1499m, 18, 4.5m, 0, new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 27, 10, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400\\u0026q=80\"}", "gray,white", new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80", "3840x2160 IPS display, 96W USB-C charging, HDR400, factory calibrated.", 21, 549m, false, false, false, true, "LG UltraFine 27 inch 4K USB-C Monitor", 699m, 30, 4.6m, 0, new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 28, 4, "Watches", "{\"default\":\"https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80", "Rotating bezel, advanced health tracking, BioActive sensor, 40hr battery life.", 18, 329m, false, true, true, true, "Samsung Galaxy Watch 6 Classic 47mm", 399m, 45, 4.4m, 0, new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 29, 10, "Mobile & Tablets", "{\"default\":\"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400\\u0026q=80\",\"green\":\"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400\\u0026q=80\"}", "black,green", new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80", "Snapdragon 8 Gen 3, Hasselblad tuned triple camera, 100W SuperVOOC charging, 5400mAh.", 19, 649m, true, true, false, true, "OnePlus 12 16GB 512GB", 799m, 35, 4.5m, 0, new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 30, 10, "Games & Videos", "{\"default\":\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400\\u0026q=80\"}", "black,white", new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", "World-class noise cancellation, high-fidelity audio, 24hr battery, comfortable design.", 24, 249m, false, true, true, true, "Bose QuietComfort 45 Wireless Headphones", 329m, 55, 4.7m, 0, new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 31, 10, "Home Appliances", "{\"default\":\"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1527515637462-cff94aca2e0b?w=400\\u0026q=80\"}", "white,black", new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", "4000Pa suction, LiDAR navigation, auto-empty base, mop function, 3hr runtime.", 20, 399m, false, false, false, true, "Xiaomi Robot Vacuum S10 Pro", 499m, 25, 4.4m, 0, new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 32, 10, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400\\u0026q=80\",\"blue\":\"https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=400\\u0026q=80\"}", "gray,blue", new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80", "13 inch PixelSense Flow touchscreen, Intel Evo i7, 16GB RAM, all-day battery.", 13, 1399m, false, true, false, true, "Microsoft Surface Pro 9 Intel i7 16GB", 1599m, 14, 4.3m, 0, new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 33, 10, "Mobile & Tablets", "{\"default\":\"https://images.unsplash.com/photo-1581993192008-63e896f4f744?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1581993192008-63e896f4f744?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400\\u0026q=80\"}", "white,gray", new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1581993192008-63e896f4f744?w=400&q=80", "Unique Glyph Interface lighting, Snapdragon 8+ Gen 1, 50MP dual camera, 4700mAh.", 17, 579m, false, true, true, true, "Nothing Phone 2 12GB 256GB", 699m, 30, 4.2m, 0, new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 34, 10, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", "Intel i9 13th Gen, RTX 4070, 16GB DDR5, 1TB NVMe, 240Hz QHD display.", 16, 2099m, false, true, true, true, "Asus ROG Strix G16 RTX 4070 Gaming Laptop", 2499m, 10, 4.8m, 0, new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 35, 10, "Games & Videos", "{\"default\":\"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400\\u0026q=80\"}", "black,white", new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", "24.2MP APS-C sensor, 4K video, Dual Pixel CMOS AF II, Wi-Fi, lightweight body.", 14, 599m, false, false, false, true, "Canon EOS R50 Mirrorless Camera Body", 699m, 20, 4.6m, 0, new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 36, 10, "Health & Sports", "{\"default\":\"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80", "Performance Monitor 5, smooth chain drive, adjustable footrests, folds for storage.", 15, 849m, false, false, false, true, "Concept2 Model D Indoor Rowing Machine", 999m, 12, 4.9m, 0, new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 37, 10, "Home Appliances", "{\"default\":\"https://images.unsplash.com/photo-1527515637462-cff94aca2e0b?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1527515637462-cff94aca2e0b?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400\\u0026q=80\"}", "black,white", new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1527515637462-cff94aca2e0b?w=400&q=80", "Auto-schedule, Energy Star certified, works with Alexa and Google Assistant, OLED display.", 18, 229m, false, true, false, true, "Google Nest Learning Thermostat 4th Gen", 279m, 40, 4.5m, 0, new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 38, 10, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400\\u0026q=80\"}", "black,white", new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80", "30K DPI optical sensor, 90hr battery, Focus Pro sensor, ultra-lightweight 64g design.", 20, 119m, false, true, true, true, "Razer DeathAdder V3 Pro Wireless Mouse", 149m, 80, 4.7m, 0, new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 39, 1, "Mobile & Tablets", "{\"default\":\"https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400\\u0026q=80\",\"blue\":\"https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400\\u0026q=80\"}", "black,blue", new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80", "A16 Bionic chip, 48MP main camera, Dynamic Island, USB-C, all-day battery life.", 13, 699m, true, true, false, true, "iPhone 15 6GB 128GB", 799m, 50, 4.6m, 0, new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 40, 10, "Home Appliances", "{\"default\":\"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1585515320310-259814833e62?w=400\\u0026q=80\"}", "gray,black", new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80", "900W motor, 32oz cup, stainless steel blades, dishwasher safe, perfect for smoothies.", 22, 69m, false, true, false, true, "NutriBullet Pro 900W Personal Blender", 89m, 100, 4.4m, 0, new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 41, 10, "Games & Videos", "{\"default\":\"https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400\\u0026q=80\"}", "white,black", new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80", "7 inch OLED screen, enhanced audio, 64GB storage, LAN port, wide adjustable stand.", 9, 319m, true, true, false, true, "Nintendo Switch OLED Model White", 349m, 35, 4.8m, 0, new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 42, 10, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1611186871525-4de78d02cd32?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80", "Intel Core i7 13th Gen, 16GB RAM, 512GB SSD, 14 inch 2.8K OLED, MIL-SPEC durability.", 14, 1549m, false, true, false, true, "Lenovo ThinkPad X1 Carbon Gen 11", 1799m, 12, 4.7m, 0, new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 43, 10, "Watches", "{\"default\":\"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400\\u0026q=80\",\"orange\":\"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400\\u0026q=80\"}", "black,orange", new DateTime(2025, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", "1.62 inch AMOLED, 16-day battery, 150 workout modes, SpO2 and heart rate monitoring.", 29, 35m, true, true, true, true, "Xiaomi Smart Band 8 Fitness Tracker", 49m, 200, 4.2m, 0, new DateTime(2025, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 44, 5, "Games & Videos", "{\"default\":\"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", "33MP BSI-CMOS sensor, 4K 60fps video, 759 phase-detect AF points, dual card slots.", 12, 2199m, false, false, false, true, "Sony Alpha A7 IV Full Frame Mirrorless", 2499m, 8, 4.9m, 0, new DateTime(2025, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 45, 10, "Health & Sports", "{\"default\":\"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80", "Adjusts from 5 to 52.5 lbs, replaces 15 sets of weights, dials select the weight.", 19, 349m, false, false, true, true, "Bowflex SelectTech 552 Adjustable Dumbbells", 429m, 22, 4.8m, 0, new DateTime(2025, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 46, 10, "Televisions", "{\"default\":\"https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400\\u0026q=80\"}", "black,gray", new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&q=80", "QLED color technology, Dolby Vision IQ, 120Hz refresh rate, Google TV built-in.", 19, 649m, false, false, false, true, "TCL 65 inch 4K QLED Smart TV", 799m, 20, 4.4m, 0, new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 47, 10, "Home Appliances", "{\"default\":\"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1585515320310-259814833e62?w=400\\u0026q=80\"}", "gray,black", new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80", "Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, warmer. 6 quart.", 20, 79m, false, true, false, true, "Instant Pot Duo 7-in-1 Electric Pressure Cooker", 99m, 80, 4.7m, 0, new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 48, 10, "Games & Videos", "{\"default\":\"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400\\u0026q=80\"}", "black,white", new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80", "THX 7.1 Spatial Audio, TriForce Titanium 50mm drivers, HyperClear mic, 70hr battery.", 20, 159m, false, true, true, true, "Razer BlackShark V2 Pro Wireless Headset", 199m, 45, 4.6m, 0, new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 49, 1, "Watches", "{\"default\":\"https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400\\u0026q=80\",\"orange\":\"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400\\u0026q=80\"}", "black,orange", new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80", "S9 SiP chip, Double Tap gesture, Always-On Retina display, carbon neutral, 18hr battery.", 12, 379m, true, true, false, true, "Apple Watch Series 9 45mm GPS", 429m, 55, 4.7m, 0, new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 50, 4, "Laptop & PC", "{\"default\":\"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400\\u0026q=80\",\"white\":\"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400\\u0026q=80\",\"black\":\"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400\\u0026q=80\"}", "white,black", new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80", "Dual QHD 5120x1440, 240Hz, 1ms, QLED, G-Sync + FreeSync, immersive 1000R curve.", 20, 1199m, false, false, true, true, "Samsung 49 inch Odyssey G9 Curved Gaming Monitor", 1499m, 10, 4.8m, 0, new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 }
                });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "Id", "Comment", "CreatedAt", "ProductId", "Rating", "UserId" },
                values: new object[,]
                {
                    { 1, "Not worth the price. Motor noise is too loud.", new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1m, 3 },
                    { 2, "Stopped working after 2 weeks.", new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1m, 5 },
                    { 3, "Great treadmill for home use! Very quiet motor.", new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 4m, 4 },
                    { 4, "Picture quality is stunning. Google Assistant works great.", new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 4.5m, 7 },
                    { 5, "Best headphones I have ever used. ANC is phenomenal!", new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 5m, 3 },
                    { 6, "Blazing fast performance. Best laptop on the market.", new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, 5m, 8 },
                    { 7, "Excellent build quality. Battery life could be better.", new DateTime(2025, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, 4m, 9 },
                    { 8, "Good watch but overpriced. The titanium feels great though.", new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, 3m, 5 },
                    { 9, "Very thin and light. Perfect for daily work.", new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, 3.5m, 3 },
                    { 10, "Beautiful design but not worth the cost.", new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, 2m, 7 },
                    { 11, "Display is amazing. Setup was easy.", new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, 3m, 4 },
                    { 12, "Best iPhone ever! Camera is insane.", new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, 5m, 6 },
                    { 13, "Great gamepad for the price. Vibration feedback is solid.", new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 10, 4.5m, 9 },
                    { 14, "S Pen makes this phone unique. Camera is top tier.", new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 11, 5m, 3 },
                    { 15, "Battery life is excellent. Performance is smooth.", new DateTime(2025, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 11, 4.4m, 7 },
                    { 16, "Sound quality is unmatched. ANC is best in class.", new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 12, 5m, 5 },
                    { 17, "Very comfortable for long listening sessions.", new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 12, 4.5m, 8 },
                    { 18, "OLED display is gorgeous. RTX 4060 handles everything.", new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 13, 4.6m, 4 },
                    { 19, "M4 chip is overkill in a good way. Display is gorgeous.", new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 14, 5m, 6 },
                    { 20, "Best tablet available. Apple Pencil integration is seamless.", new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 14, 4.8m, 9 },
                    { 21, "Quantum HDR makes movies pop. Alexa integration is useful.", new DateTime(2025, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 15, 4.5m, 3 },
                    { 22, "Running metrics are incredibly detailed. Battery lasts 15 days!", new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 16, 4.6m, 5 },
                    { 23, "Laser detection is amazing. Picks up dust I couldn't see.", new DateTime(2025, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 17, 4.7m, 7 },
                    { 24, "Haptic feedback completely changes gaming. DualSense is phenomenal.", new DateTime(2025, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 18, 5m, 4 },
                    { 25, "Adaptive triggers add immersion. Battery life is decent.", new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 18, 4.5m, 8 },
                    { 26, "Google AI features are impressive. Camera is outstanding.", new DateTime(2025, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 19, 4.5m, 6 },
                    { 27, "Best mouse I have ever used. MagSpeed scrolling is addictive.", new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 20, 5m, 3 },
                    { 28, "Ergonomics are perfect. Quiet clicks are a game changer in office.", new DateTime(2025, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 20, 4.8m, 9 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_BrandId",
                table: "Products",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_UserId",
                table: "Products",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ProductId",
                table: "Reviews",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserId",
                table: "Reviews",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
