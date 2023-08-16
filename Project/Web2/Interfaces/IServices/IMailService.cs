namespace Web2.Interfaces.IServices
{
    public interface IMailService
    {
        Task SendEmail(string subject, string body, string receiver);
    }
}
