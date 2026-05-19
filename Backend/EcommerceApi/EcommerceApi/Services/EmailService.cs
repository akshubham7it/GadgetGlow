using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace EcommerceApi.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string htmlBody)
        {
            var host = _config["EmailSettings:Host"] ?? throw new InvalidOperationException("EmailSettings:Host is missing");
            var portStr = _config["EmailSettings:Port"] ?? throw new InvalidOperationException("EmailSettings:Port is missing");
            var username = _config["EmailSettings:Username"] ?? throw new InvalidOperationException("EmailSettings:Username is missing");
            var password = _config["EmailSettings:Password"] ?? throw new InvalidOperationException("EmailSettings:Password is missing");
            var fromName = _config["EmailSettings:FromName"] ?? "ECommerce Store";

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(fromName, username));
            message.To.Add(MailboxAddress.Parse(toEmail));
            message.Subject = subject;
            message.Body = new TextPart("html") { Text = htmlBody };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(host, int.Parse(portStr), SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(username, password);
            await smtp.SendAsync(message);
            await smtp.DisconnectAsync(true);
        }
    }
}