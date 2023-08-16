using AutoMapper;
using Web2.DTOs;
using Web2.Interfaces;
using Web2.Interfaces.IServices;
using Web2.Models;

namespace Web2.Services
{
    public class AdminService : IAdminService
    {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        private IMailService _mailService;

        public AdminService(IUnitOfWork unitOfWork, IMapper mapper, IMailService mailService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _mailService = mailService;
        }

        public async Task<List<OrderDTO>> GetAllOrders()
        {
            var orders = await _unitOfWork.Orders.GetAll(null, x => x.OrderByDescending(y => y.OrderTime), new List<string> { "Items" });
            return _mapper.Map<List<OrderDTO>>(orders);
        }

        public async Task<List<UserDTO>> GetBuyers()
        {
            var users = await _unitOfWork.Users.GetAll(x => x.Type == UserType.Buyer);
            return _mapper.Map<List<UserDTO>>(users);
        }

        public async Task<List<UserDTO>> GetDeclinedUsers()
        {
            var users = await _unitOfWork.Users.GetAll(x => x.VerificationStatus == VerificationStatus.Declined && x.Type == UserType.Seller);
            return _mapper.Map<List<UserDTO>>(users);
        }

        public async Task<List<UserDTO>> GetVerifiedUsers()
        {
            var users = await _unitOfWork.Users.GetAll(x => x.VerificationStatus == VerificationStatus.Accepted && x.Type == UserType.Seller);
            return _mapper.Map<List<UserDTO>>(users);
        }

        public async Task<List<UserDTO>> GetWaitingUsers()
        {
            var users = await _unitOfWork.Users.GetAll(x => x.VerificationStatus == VerificationStatus.Waiting && x.Type == UserType.Seller);
            return _mapper.Map<List<UserDTO>>(users);
        }

        public async Task SetUserStatus(VerifyDTO verifyDTO)
        {
            var user = await _unitOfWork.Users.Get(x => x.Id == verifyDTO.Id);
            if (user == null)
                throw new Exception("User with this ID doesn't exist.");

            if (user.VerificationStatus != VerificationStatus.Waiting)
                throw new Exception("Only verify waiting users");

            user.VerificationStatus = verifyDTO.VerificationStatus;
            _unitOfWork.Users.Update(user);

            string message = user.VerificationStatus == VerificationStatus.Accepted ? $"You have been verified.\r\nYou can now sell." : "Your verification has been denied.\r\nPlease contact administrators.";
            _ = Task.Run(async () => await _mailService.SendEmail("Verification status", message, user.Email!));
            await _unitOfWork.Save();
        }
    }
}
