using MailKit.Net.Smtp;
using MimeKit;
using Web2.Interfaces.IServices;

namespace Web2.Services
{
    public class MailService : IMailService
    {
        IConfiguration _configuration;

        public MailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendEmail(string subject, string body, string receiver)
        {
            var message = new MimeMessage
            {
                Subject = subject,
                Body = new TextPart(MimeKit.Text.TextFormat.Plain) { Text = body }
            };
            message.From.Add(new MailboxAddress(_configuration["Mail:Name"], _configuration["Mail:Email"]));
            message.To.Add(MailboxAddress.Parse(receiver));

            var client = new SmtpClient();
            await client.ConnectAsync(_configuration["Mail:Host"], int.Parse(_configuration["Mail:Port"]!), MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_configuration["Mail:Email"], _configuration["Mail:Password"]);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}
