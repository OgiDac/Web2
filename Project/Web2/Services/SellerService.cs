using AutoMapper;
using Web2.DTOs;
using Web2.Interfaces;
using Web2.Interfaces.IServices;

namespace Web2.Services
{
    public class SellerService : ISellerService
    {
        IUnitOfWork _unitOfWork;
        IMapper _mapper;

        public SellerService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public Task AddProduct(CreateProductDTO product, int userId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteProduct(int id, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<List<OrderDTO>> GetNewOrders(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<List<OrderDTO>> GetOrders(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<ProductDTO> GetProduct(int id, int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ProductDTO>> GetProducts(int userId)
        {
            var user = await _unitOfWork.Users.Get(x => x.Id == userId, new List<string> { "Products" }) ?? throw new Exception("Error with id in token. Logout and login again");
            return _mapper.Map<List<ProductDTO>>(user.Products!);
        }

        public Task UpdateProduct(int id, ProductDTO product, int userId)
        {
            throw new NotImplementedException();
        }
    }
}
