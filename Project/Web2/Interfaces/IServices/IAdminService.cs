using Web2.DTOs;

namespace Web2.Interfaces.IServices
{
    public interface IAdminService
    {
        //public Task<List<OrderDTO>> GetAllOrders();
        public Task<List<UserDTO>> GetWaitingUsers();
        public Task<List<UserDTO>> GetVerifiedUsers();
        public Task<List<UserDTO>> GetBuyers();
        public Task<List<UserDTO>> GetDeclinedUsers();
        public Task SetUserStatus(VerifyDTO verifyDTO);
    }
}
