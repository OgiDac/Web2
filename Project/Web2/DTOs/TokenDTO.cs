using System.ComponentModel.DataAnnotations;

namespace Web2.DTOs
{
    public class TokenDTO
    {
        [Required]
        public string? Token { get; set; }
    }
}
