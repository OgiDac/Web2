using AutoMapper;
using Web2.DTOs;
using Web2.Models;

namespace Web2.Config
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<RegisterDTO, User>().ForMember(dest => dest.Password, opt => opt.MapFrom(dto => dto.Password + "a"));
            CreateMap<User, RegisterDTO>();
        }
    }
}
