using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EcommerceApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUsersFromSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "High-performance portable electric grinder suitable for home use.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Foldable motorised treadmill for home workouts. Ultra-silent motor.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "43-inch Full HD Android Smart TV with frameless design.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ReviewCount", "UserId" },
                values: new object[] { 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Apple MacBook Pro with M4 Pro chip, 16GB RAM, 512GB SSD.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Aerospace-grade titanium Apple Watch Ultra with dual-frequency GPS.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Supercharged by M4. The thinnest, lightest Mac ever made.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Stunning 24-inch 4.5K Retina display iMac powered by M4.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "iPhone 16 Pro with A18 Pro chip, ProMotion display, 48MP camera.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Dual vibration USB gamepad compatible with PC and Android.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "ReviewCount", "UserId" },
                values: new object[] { 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Industry-leading noise cancellation, 30hr battery, multipoint connection.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "ReviewCount", "UserId" },
                values: new object[] { 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Ultra Retina XDR display, M4 chip, Apple Pencil Pro compatible.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "ReviewCount", "UserId" },
                values: new object[] { 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "AMOLED display, advanced running dynamics, up to 15-day battery.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Laser detects invisible dust, HEPA filtration, 60min runtime.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Haptic feedback, adaptive triggers, built-in microphone, USB-C charging.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Google Tensor G3 chip, 50MP triple camera, 7 years of OS updates.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "8K DPI sensor, quiet clicks, MagSpeed electromagnetic scroll, USB-C.", 0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 21,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Sony OLED 4K TV with Cognitive Processor XR and Google TV.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Active Noise Cancellation, Adaptive Transparency, H2 chip.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "14.6 inch Dynamic AMOLED 2X, Snapdragon 8 Gen 2, 12GB RAM, S Pen.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Tenkeyless, hot-swappable switches, RGB LIGHTSYNC, tournament grade.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 25,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Built-in GPS, heart rate monitoring, 7-day battery, Google Maps support.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 26,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Intel Core Ultra 7, 16GB RAM, 1TB SSD, 2.8K OLED touchscreen.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 27,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "3840x2160 IPS, 96W USB-C charging, HDR400, factory calibrated.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 28,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Rotating bezel, BioActive sensor, advanced health tracking, 40hr battery.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 29,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Snapdragon 8 Gen 3, Hasselblad camera, 100W SuperVOOC, 5400mAh.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 30,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "World-class noise cancellation, high-fidelity audio, 24hr battery.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 31,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "4000Pa suction, LiDAR navigation, auto-empty base, mop function.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 32,
                columns: new[] { "ColorImages", "Description", "UserId" },
                values: new object[] { "{\"default\":\"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400\\u0026q=80\",\"blue\":\"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400\\u0026q=80\"}", "13 inch PixelSense Flow touchscreen, Intel Evo i7, 16GB RAM.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 33,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Glyph Interface, Snapdragon 8+ Gen 1, 50MP dual camera, 4700mAh.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 34,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Intel i9 13th Gen, RTX 4070, 16GB DDR5, 1TB NVMe, 240Hz QHD.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 35,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "24.2MP APS-C sensor, 4K video, Dual Pixel CMOS AF II, Wi-Fi.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 36,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Performance Monitor 5, smooth chain drive, adjustable footrests.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 37,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Auto-schedule, Energy Star, works with Alexa and Google Assistant.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 38,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "30K DPI, 90hr battery, Focus Pro sensor, ultra-lightweight 64g.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 39,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "A16 Bionic chip, 48MP main camera, Dynamic Island, USB-C.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 40,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "900W motor, 32oz cup, stainless steel blades, dishwasher safe.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 41,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "7 inch OLED screen, enhanced audio, 64GB storage, LAN port.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 42,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Intel Core i7 13th Gen, 16GB RAM, 512GB SSD, 14 inch 2.8K OLED.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 43,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "1.62 inch AMOLED, 16-day battery, 150 workout modes, SpO2 monitoring.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 44,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "33MP BSI-CMOS sensor, 4K 60fps video, 759 phase-detect AF points.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 45,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Adjusts 5 to 52.5 lbs, replaces 15 sets of weights.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 46,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "QLED color technology, Dolby Vision IQ, 120Hz, Google TV built-in.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 47,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Pressure cooker, slow cooker, rice cooker, steamer, sauté. 6 quart.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 48,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "THX 7.1 Spatial Audio, TriForce 50mm drivers, HyperClear mic, 70hr battery.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 49,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "S9 SiP chip, Double Tap gesture, Always-On Retina display, 18hr battery.", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 50,
                columns: new[] { "Description", "Name", "UserId" },
                values: new object[] { "Dual QHD 5120x1440, 240Hz, 1ms, QLED, G-Sync + FreeSync, 1000R curve.", "Samsung 49 inch Odyssey G9 Curved Monitor", null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "High-performance portable electric grinder suitable for home use. Compact design with powerful motor.", 2, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Foldable motorised treadmill for home workouts. Ultra-silent motor with adjustable speed settings.", 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "43-inch Full HD Android Smart TV with frameless design. Built-in Chromecast and Google Assistant.", 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ReviewCount", "UserId" },
                values: new object[] { 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Apple MacBook Pro with M4 Pro chip, 16GB RAM, 512GB SSD. Incredible performance for professionals.", 2, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Aerospace-grade titanium Apple Watch Ultra with action button and precision dual-frequency GPS.", 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Supercharged by M4. The thinnest, lightest Mac ever made with all-day battery life.", 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Stunning 24-inch 4.5K Retina display iMac powered by M4. Available in multiple colors.", 2, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "iPhone 16 Pro with A18 Pro chip, ProMotion display, 48MP camera system.", 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Dual vibration USB gamepad compatible with PC and Android. Ergonomic design for long gaming sessions.", 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "ReviewCount", "UserId" },
                values: new object[] { 2, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Industry-leading noise cancellation, 30hr battery, multipoint connection, crystal clear calls.", 2, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "ReviewCount", "UserId" },
                values: new object[] { 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Ultra Retina XDR display, M4 chip, Apple Pencil Pro compatible, 10hr battery.", 2, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "ReviewCount", "UserId" },
                values: new object[] { 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "AMOLED display, advanced running dynamics, training readiness score, up to 15-day battery.", 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Laser detects invisible dust, HEPA filtration, 60min runtime, automatic suction adjustment.", 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Haptic feedback, adaptive triggers, built-in microphone, USB-C charging, 12hr battery.", 2, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "Google Tensor G3 chip, 50MP triple camera, 7 years of OS updates, 30W fast charging.", 1, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "Description", "ReviewCount", "UserId" },
                values: new object[] { "8K DPI sensor, quiet clicks, MagSpeed electromagnetic scroll, ergonomic design, USB-C.", 2, 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 21,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Sony OLED 4K TV with Cognitive Processor XR, Acoustic Surface Audio, and Google TV.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio with H2 chip.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "14.6 inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, 12GB RAM, S Pen included.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Tenkeyless design, hot-swappable switches, RGB LIGHTSYNC, tournament grade.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 25,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Built-in GPS, heart rate monitoring, 7-day battery, Google Maps and Wallet support.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 26,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Intel Core Ultra 7, 16GB RAM, 1TB SSD, 2.8K OLED touchscreen, 360 degree hinge.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 27,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "3840x2160 IPS display, 96W USB-C charging, HDR400, factory calibrated.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 28,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Rotating bezel, advanced health tracking, BioActive sensor, 40hr battery life.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 29,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Snapdragon 8 Gen 3, Hasselblad tuned triple camera, 100W SuperVOOC charging, 5400mAh.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 30,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "World-class noise cancellation, high-fidelity audio, 24hr battery, comfortable design.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 31,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "4000Pa suction, LiDAR navigation, auto-empty base, mop function, 3hr runtime.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 32,
                columns: new[] { "ColorImages", "Description", "UserId" },
                values: new object[] { "{\"default\":\"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400\\u0026q=80\",\"gray\":\"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400\\u0026q=80\",\"blue\":\"https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=400\\u0026q=80\"}", "13 inch PixelSense Flow touchscreen, Intel Evo i7, 16GB RAM, all-day battery.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 33,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Unique Glyph Interface lighting, Snapdragon 8+ Gen 1, 50MP dual camera, 4700mAh.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 34,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Intel i9 13th Gen, RTX 4070, 16GB DDR5, 1TB NVMe, 240Hz QHD display.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 35,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "24.2MP APS-C sensor, 4K video, Dual Pixel CMOS AF II, Wi-Fi, lightweight body.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 36,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Performance Monitor 5, smooth chain drive, adjustable footrests, folds for storage.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 37,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Auto-schedule, Energy Star certified, works with Alexa and Google Assistant, OLED display.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 38,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "30K DPI optical sensor, 90hr battery, Focus Pro sensor, ultra-lightweight 64g design.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 39,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "A16 Bionic chip, 48MP main camera, Dynamic Island, USB-C, all-day battery life.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 40,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "900W motor, 32oz cup, stainless steel blades, dishwasher safe, perfect for smoothies.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 41,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "7 inch OLED screen, enhanced audio, 64GB storage, LAN port, wide adjustable stand.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 42,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Intel Core i7 13th Gen, 16GB RAM, 512GB SSD, 14 inch 2.8K OLED, MIL-SPEC durability.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 43,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "1.62 inch AMOLED, 16-day battery, 150 workout modes, SpO2 and heart rate monitoring.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 44,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "33MP BSI-CMOS sensor, 4K 60fps video, 759 phase-detect AF points, dual card slots.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 45,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Adjusts from 5 to 52.5 lbs, replaces 15 sets of weights, dials select the weight.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 46,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "QLED color technology, Dolby Vision IQ, 120Hz refresh rate, Google TV built-in.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 47,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, warmer. 6 quart.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 48,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "THX 7.1 Spatial Audio, TriForce Titanium 50mm drivers, HyperClear mic, 70hr battery.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 49,
                columns: new[] { "Description", "UserId" },
                values: new object[] { "S9 SiP chip, Double Tap gesture, Always-On Retina display, carbon neutral, 18hr battery.", 2 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 50,
                columns: new[] { "Description", "Name", "UserId" },
                values: new object[] { "Dual QHD 5120x1440, 240Hz, 1ms, QLED, G-Sync + FreeSync, immersive 1000R curve.", "Samsung 49 inch Odyssey G9 Curved Gaming Monitor", 2 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedAt", "Email", "IsAdmin", "IsBuyer", "IsSeller", "Name", "PasswordHash", "Phone", "PhoneCode", "Status" },
                values: new object[,]
                {
                    { 1, "Kathmandu", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "shubham@gmail.com", true, false, false, "Shubham Ghimire", "$2a$10$1mE5kOtTGdDXx8bSGJaE8ufF4FsixrX1bxdXUtE3zDa3DAsm8LXwa", "9800000001", "+977", "Approved" },
                    { 2, "Pokhara", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "aayush@gmail.com", false, false, true, "Aayush Sharma", "$2a$10$J6G6j1xZ0ZvKqla.uDURHuvx/XkJq3z5i4giztjqlR.ognF2wUTuO", "9800000002", "+977", "Approved" },
                    { 3, "Lalitpur", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "rohan@gmail.com", false, true, false, "Rohan Karki", "$2a$10$FFGHwQA2Ozm3dgT2OUs/LOMlBkCpPYuP6iPxVylTYG/o9IfpDGMsW", "9800000003", "+977", "Approved" },
                    { 4, "Bhaktapur", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "suman@gmail.com", false, true, true, "Suman Thapa", "$2a$10$SUZrwHsWvunBsfS4mohuY.GovV/Bv6tim2GSru1llrjLrEH2oF.Ea", "9800000004", "+977", "Approved" },
                    { 5, "Chitwan", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "prakash@gmail.com", false, true, false, "Prakash Adhikari", "$2a$10$bBma1tTA8TokDKQe7WOT9u05jK0EF/8STV3PFGjgAHn23FGmg.1Da", "9800000005", "+977", "Approved" },
                    { 6, "Butwal", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "bikash@gmail.com", false, false, true, "Bikash Gurung", "$2a$10$Razs7NdNFwDm5Vh.vUfnoOthisShzTpFcp7TUF0URogJis.qgp6fG", "9800000006", "+977", "Approved" },
                    { 7, "Dharan", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "nabin@gmail.com", false, true, false, "Nabin Shrestha", "$2a$10$I97Nargmhtk/QItuoPfH1eXldneU0gp.1o1X7PsZCkTf7aJRJ0ZvC", "9800000007", "+977", "Approved" },
                    { 8, "Biratnagar", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "kiran@gmail.com", false, true, true, "Kiran Rai", "$2a$10$D1E0JJCUYGZlo/GpSdHIvuqJvYCAjvsXynywLlrRSFcg6/JLJt/R2", "9800000008", "+977", "Approved" },
                    { 9, "Janakpur", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "santosh@gmail.com", false, true, false, "Santosh Bhandari", "$2a$10$gVFu1isQqil.xYtpQz4eaexs.5BXf8IH7VDqIbq9kK7Mss7obM1.C", "9800000009", "+977", "Approved" },
                    { 10, "Kathmandu", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "dipesh@gmail.com", true, true, true, "Dipesh KC", "$2a$10$MlUtdAHiw.4oUKjjS7IgHOSfGaKu6ZztHXupnypkw31B7BXBTnUI2", "9800000010", "+977", "Approved" }
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
        }
    }
}
