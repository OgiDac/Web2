using AutoMapper;
using Google.Apis.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Web2.DTOs;
using Web2.ExceptionHandler;
using Web2.Interfaces;
using Web2.Interfaces.IServices;
using Web2.Models;
using BC = BCrypt.Net;

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
            if (registerDTO.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    registerDTO.ImageFile.CopyTo(ms);
                    user.Image = ms.ToArray();
                }
            }
            await _unitOfWork.Users.Insert(user);
            await _unitOfWork.Save();
        }

        private string GetToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username!),
                new Claim(ClaimTypes.Role, user.Type.ToString()),
                new Claim("Id", user.Id.ToString()),
                new Claim("Email", user.Email!),
            };
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string> Login(LoginDTO loginDTO)
        {
            var user = await _unitOfWork.Users.Get(x => x.Email == loginDTO.Email);
            if (user == null)
                throw new MyException($"Incorrect email. Try again.");

            if (!BC.BCrypt.Verify(loginDTO.Password, user.Password))
                throw new MyException("Invalid password");

            if (user.Type == UserType.Seller)
            {
                if (user.VerificationStatus == VerificationStatus.Waiting)
                    throw new Exception("You are not verified. Wait to be verified by administrators.");
                if (user.VerificationStatus == VerificationStatus.Declined)
                    throw new Exception("You were declined by administrators. Contact to see why.");
            }

            return GetToken(user);
        }
        public async Task<string> GoogleSignIn(TokenDTO token)
        {
            var str = _configuration["Google:ClientID"]!;
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { _configuration["Google:ClientID"]! }
            };

            var data = await GoogleJsonWebSignature.ValidateAsync(token.Token, settings);

            var user = await _unitOfWork.Users.Get(x => x.Email == data.Email);
            if (user != null)
                return GetToken(user);

            user = new User
            {
                Email = data.Email,
                FullName = $"{data.GivenName} {data.FamilyName}",
                Birthday = DateTime.Now,
                Address = $"No address",
                Password = BC.BCrypt.HashPassword("123"),
                VerificationStatus = VerificationStatus.Waiting,
                Type = UserType.Buyer,
                Username = data.GivenName + (new Random().Next() / 100000).ToString(),
            };

            if (data.Picture != null)
                Convert.TryFromBase64String(data.Picture, user.Image, out int b);

            await _unitOfWork.Users.Insert(user);
            await _unitOfWork.Save();

            return GetToken(user);
        }

    }
}
