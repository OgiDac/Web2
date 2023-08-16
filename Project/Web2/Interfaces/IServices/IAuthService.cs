using Web2.DTOs;

namespace Web2.Interfaces.IServices
{
    public interface IAuthService
    {
        public Task Register(RegisterDTO registerDTO);

        public Task<string> Login(LoginDTO loginDTO);

        public Task<string> GoogleSignIn(TokenDTO token);
    }
}
