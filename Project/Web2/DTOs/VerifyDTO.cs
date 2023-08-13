using System.ComponentModel.DataAnnotations;
using Web2.Models;

namespace Web2.DTOs
{
    public class VerifyDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public VerificationStatus VerificationStatus { get; set; }
    }
}
