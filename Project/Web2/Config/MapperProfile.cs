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
            CreateMap<RegisterDTO, User>().ForMember(dest => dest.Password, opt => opt.MapFrom(dto =>  BC.BCrypt.HashPassword(dto.Password)));
            CreateMap<User, RegisterDTO>();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, EditProfileDTO>().ReverseMap();
            CreateMap<User, SellerDTO>().ReverseMap();

            CreateMap<Order, CreateOrderDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();

            CreateMap<Item, ItemDTO>().ReverseMap();
            CreateMap<Item, CreateItemDTO>().ReverseMap();

            CreateMap<Product, CreateProductDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
        }
    }
}
