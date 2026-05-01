using EcommerceApi.Data;
using EcommerceApi.Models;

namespace EcommerceApi.Services
{
    // ── WHY THIS APPROACH? ────────────────────────────────────────────
    // HasData() in AppDbContext runs during migrations and stores the
    // raw string in the migration file. BCrypt hashes generated outside
    // .NET (Python etc.) use $2b$ prefix which BCrypt.Net rejects.
    //
    // This seeder runs AFTER the app starts, uses .NET's own BCrypt to
    // hash passwords, and only seeds if the users don't already exist.
    // No migration changes needed — just run: dotnet run
    // ─────────────────────────────────────────────────────────────────
    public static class DataSeeder
    {
        public static void SeedUsers(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            // Only seed if NO users exist yet
            if (context.Users.Any()) return;

            var users = new List<AppUser>
            {
                new AppUser
                {
                    Name         = "Shubham Ghimire",
                    Email        = "shubham@gmail.com",
                    // BCrypt.Net hashes these at startup — always $2a$ prefix
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    IsAdmin      = true,
                    IsSeller     = false,
                    IsBuyer      = false,
                    Status       = "Approved",
                    PhoneCode    = "+977",
                    Phone        = "9800000001",
                    Address      = "Kathmandu",
                    CreatedAt    = new DateTime(2025, 1, 1)
                },
                new AppUser
                {
                    Name         = "Aayush Sharma",
                    Email        = "aayush@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    IsAdmin      = false,
                    IsSeller     = true,
                    IsBuyer      = false,
                    Status       = "Approved",
                    PhoneCode    = "+977",
                    Phone        = "9800000002",
                    Address      = "Pokhara",
                    CreatedAt    = new DateTime(2025, 1, 1)
                },
                new AppUser
                {
                    Name         = "Rohan Karki",
                    Email        = "rohan@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    IsAdmin      = false,
                    IsSeller     = false,
                    IsBuyer      = true,
                    Status       = "Approved",
                    PhoneCode    = "+977",
                    Phone        = "9800000003",
                    Address      = "Lalitpur",
                    CreatedAt    = new DateTime(2025, 1, 1)
                },
                new AppUser
                {
                    Name         = "Suman Thapa",
                    Email        = "suman@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    IsAdmin      = false,
                    IsSeller     = true,
                    IsBuyer      = true,
                    Status       = "Approved",
                    PhoneCode    = "+977",
                    Phone        = "9800000004",
                    Address      = "Bhaktapur",
                    CreatedAt    = new DateTime(2025, 1, 1)
                },
                new AppUser
                {
                    Name         = "Prakash Adhikari",
                    Email        = "prakash@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    IsAdmin      = false,
                    IsSeller     = false,
                    IsBuyer      = true,
                    Status       = "Approved",
                    PhoneCode    = "+977",
                    Phone        = "9800000005",
                    Address      = "Chitwan",
                    CreatedAt    = new DateTime(2025, 1, 1)
                },
                new AppUser
                {
                    Name         = "Bikash Gurung",
                    Email        = "bikash@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    IsAdmin      = false,
                    IsSeller     = true,
                    IsBuyer      = false,
                    Status       = "Approved",
                    PhoneCode    = "+977",
                    Phone        = "9800000006",
                    Address      = "Butwal",
                    CreatedAt    = new DateTime(2025, 1, 1)
                },
                new AppUser
                {
                    Name         = "Nabin Shrestha",
                    Email        = "nabin@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    IsAdmin      = false,
                    IsSeller     = false,
                    IsBuyer      = true,
                    Status       = "Approved",
                    PhoneCode    = "+977",
                    Phone        = "9800000007",
                    Address      = "Dharan",
                    CreatedAt    = new DateTime(2025, 1, 1)
                },
                new AppUser
                {
                    Name         = "Kiran Rai",
                    Email        = "kiran@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    IsAdmin      = false,
                    IsSeller     = true,
                    IsBuyer      = true,
                    Status       = "Approved",
                    PhoneCode    = "+977",
                    Phone        = "9800000008",
                    Address      = "Biratnagar",
                    CreatedAt    = new DateTime(2025, 1, 1)
                },
                new AppUser
                {
                    Name         = "Santosh Bhandari",
                    Email        = "santosh@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    IsAdmin      = false,
                    IsSeller     = false,
                    IsBuyer      = true,
                    Status       = "Approved",
                    PhoneCode    = "+977",
                    Phone        = "9800000009",
                    Address      = "Janakpur",
                    CreatedAt    = new DateTime(2025, 1, 1)
                },
                new AppUser
                {
                    Name         = "Dipesh KC",
                    Email        = "dipesh@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                    IsAdmin      = true,
                    IsSeller     = true,
                    IsBuyer      = true,
                    Status       = "Approved",
                    PhoneCode    = "+977",
                    Phone        = "9800000010",
                    Address      = "Kathmandu",
                    CreatedAt    = new DateTime(2025, 1, 1)
                }
            };

            context.Users.AddRange(users);
            context.SaveChanges();
        }
    }
}