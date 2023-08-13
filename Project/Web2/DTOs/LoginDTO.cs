using System.ComponentModel.DataAnnotations;

namespace Web2.DTOs
{
    public class LoginDTO
    {
        [Required, MaxLength(100)]
        public string? Email { get; set; }
        [Required, MaxLength(100)]
        public string? Password { get; set; }
    }
}
