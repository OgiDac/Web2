using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web2.DTOs;
using Web2.Interfaces.IServices;

namespace Web2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("accepted-users")]
        public async Task<IActionResult> GetVerifiedUsers()
        {
            var users = await _adminService.GetVerifiedUsers();
            return Ok(users);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("waiting-users")]
        public async Task<IActionResult> GetWaitingUsers()
        {
            var users = await _adminService.GetWaitingUsers();
            return Ok(users);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("declined-users")]
        public async Task<IActionResult> GetDeclinedUsers()
        {
            var users = await _adminService.GetDeclinedUsers();
            return Ok(users);
        }
        [Authorize(Roles = "Administrator")]
        [HttpGet("buyers")]
        public async Task<IActionResult> GetBuyers()
        {
            var users = await _adminService.GetBuyers();
            return Ok(users);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("verify-user")]
        public async Task<IActionResult> VerifyUser(VerifyDTO verifyDTO)
        {
            await _adminService.SetUserStatus(verifyDTO);
            return Ok();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("orders")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _adminService.GetAllOrders();
            return Ok(orders);
        }

    }
}
