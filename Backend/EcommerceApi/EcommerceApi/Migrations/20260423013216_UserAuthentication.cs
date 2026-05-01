using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcommerceApi.Migrations
{
    /// <inheritdoc />
    public partial class UserAuthentication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$10$1mE5kOtTGdDXx8bSGJaE8ufF4FsixrX1bxdXUtE3zDa3DAsm8LXwa");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$10$J6G6j1xZ0ZvKqla.uDURHuvx/XkJq3z5i4giztjqlR.ognF2wUTuO");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PasswordHash",
                value: "$2a$10$FFGHwQA2Ozm3dgT2OUs/LOMlBkCpPYuP6iPxVylTYG/o9IfpDGMsW");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "PasswordHash",
                value: "$2a$10$SUZrwHsWvunBsfS4mohuY.GovV/Bv6tim2GSru1llrjLrEH2oF.Ea");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "PasswordHash",
                value: "$2a$10$bBma1tTA8TokDKQe7WOT9u05jK0EF/8STV3PFGjgAHn23FGmg.1Da");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "PasswordHash",
                value: "$2a$10$Razs7NdNFwDm5Vh.vUfnoOthisShzTpFcp7TUF0URogJis.qgp6fG");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7,
                column: "PasswordHash",
                value: "$2a$10$I97Nargmhtk/QItuoPfH1eXldneU0gp.1o1X7PsZCkTf7aJRJ0ZvC");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8,
                column: "PasswordHash",
                value: "$2a$10$D1E0JJCUYGZlo/GpSdHIvuqJvYCAjvsXynywLlrRSFcg6/JLJt/R2");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9,
                column: "PasswordHash",
                value: "$2a$10$gVFu1isQqil.xYtpQz4eaexs.5BXf8IH7VDqIbq9kK7Mss7obM1.C");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 10,
                column: "PasswordHash",
                value: "$2a$10$MlUtdAHiw.4oUKjjS7IgHOSfGaKu6ZztHXupnypkw31B7BXBTnUI2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2b$10$aC1eoqa7avnfCpDxG4sj5u/fswBjcrcbLeT1YzILzUGYoe1NzBUYu");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2b$10$4zKXmWdQpjJCSU3ipibrwuPlrwD/CK/wXKVxYMdzpaT9Af5IK7eAS");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PasswordHash",
                value: "$2b$10$n7zSiQJgGyRIiMoKIv5XLeUFAfrK3thpVEHKLMiFVRwZumRQeueti");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "PasswordHash",
                value: "$2b$10$97Ix/DTGFcFpvrjPtbTryeL760ZbhSZprrlMd3AaBl9WSkWcOi34i");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "PasswordHash",
                value: "$2b$10$E/lzPMeEPjFJEWaoOYUnReBDt6iQvjgnaUWj9xB6bNU1LHzrNTtmO");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "PasswordHash",
                value: "$2b$10$tCwlaRGvOxStIhQ25Aezr.qkyYk1z0nMRwcNDN8YxgSdPXNgLEdAm");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7,
                column: "PasswordHash",
                value: "$2b$10$z0mumk3oqlZ5Jl2InrmY8Of4gNG10NyZDxEdCYVDgzRVVkYMe9ffO");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8,
                column: "PasswordHash",
                value: "$2b$10$iSAUrwKKx5tX.QQRkgCgWey7YkcR2fT1P2AIU7WfZNU9ndxUOq7ym");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9,
                column: "PasswordHash",
                value: "$2b$10$gQENyPLA8g6zVZHaIINgQ.j09K3H6lsbeJRq6SARoF1huryA2UHE2");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 10,
                column: "PasswordHash",
                value: "$2b$10$Z/EJag37h7BLmiLNtF1yf.dn2fGy2edAbxV/kzZQ39VvDNfZ9Tf6u");
        }
    }
}
