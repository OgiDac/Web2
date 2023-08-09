using AutoMapper;
using Web2.DTOs;
using Web2.Interfaces;
using Web2.Interfaces.IServices;
using Web2.Models;

namespace Web2.Services
{
    public class AuthService : IAuthService
    {
        private IUnitOfWork _unitOfWork;
        private IConfiguration _configuration;
        private IMapper _mapper;
        public AuthService(IUnitOfWork unitOfWork, IConfiguration configuration, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task Register(RegisterDTO registerDTO)
        {
            if(registerDTO.Type == UserType.Administrator)
            {
                throw new Exception("Ne moze admin");
            }
            var user = _mapper.Map<User>(registerDTO);
            await _unitOfWork.Users.Insert(user);
            await _unitOfWork.Save();
        }
    }
}
