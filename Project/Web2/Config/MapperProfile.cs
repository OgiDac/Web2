using BC = BCrypt.Net;
using AutoMapper;
using Web2.DTOs;
using Web2.Models;

namespace Web2.Config
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<RegisterDTO, User>().ForMember(dest => dest.Password, opt => opt.MapFrom(dto =>  BC.BCrypt.HashPassword(dto.Password)))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(dto => dto.ImageFile));
            CreateMap<User, RegisterDTO>().ForMember(dest => dest.ImageFile, opt => opt.MapFrom(user => user.Image));
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, EditProfileDTO>().ReverseMap();

        }
    }
}
