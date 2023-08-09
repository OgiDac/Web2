using Web2.DTOs;

namespace Web2.Interfaces.IServices
{
    public interface IAuthService
    {
        public Task Register(RegisterDTO registerDTO);
    }
}
