using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web2.DTOs;
using Web2.Interfaces.IServices;

namespace Web2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        IProfileService _profileService;
        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int id))
                throw new Exception("Bad ID. Logout and login.");
            var profile = await _profileService.GetProfile(id);
            return Ok(profile);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> EditProfile([FromForm] EditProfileDTO editProfileDTO)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int id))
                throw new Exception("Bad ID. Logout and login.");

            await _profileService.EditProfile(id, editProfileDTO);
            return Ok();
        }
    }
}
