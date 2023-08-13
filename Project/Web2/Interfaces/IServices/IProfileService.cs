using Web2.DTOs;

namespace Web2.Interfaces.IServices
{
    public interface IProfileService
    {
        public Task<UserDTO> GetProfile(int id);
        public Task EditProfile(int id, EditProfileDTO profile);
    }
}
