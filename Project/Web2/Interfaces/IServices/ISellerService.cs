using Web2.DTOs;

namespace Web2.Interfaces.IServices
{
    public interface ISellerService
    {
        public Task<List<ProductDTO>> GetProducts(int userId);
        public Task<ProductDTO> GetProduct(int id, int userId);
        public Task DeleteProduct(int id, int userId);
        public Task UpdateProduct(int id, ProductDTO product, int userId);
        public Task AddProduct(CreateProductDTO product, int userId);
        public Task<List<OrderDTO>> GetOrders(int userId);
        public Task<List<OrderDTO>> GetNewOrders(int userId);
    }
}
