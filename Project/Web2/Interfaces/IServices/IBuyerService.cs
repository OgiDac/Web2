using Web2.DTOs;

namespace Web2.Interfaces.IServices
{
    public interface IBuyerService
    {
        public Task<List<ProductDTO>> GetProducts();

        public Task CreateOrder(CreateOrderDTO createOrder, int userId);
        public Task CancelOrder(int userId, int id);

        public Task<List<OrderDTO>> GetMyOrders(int userId);
    }
}
