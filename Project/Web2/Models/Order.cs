using System.ComponentModel.DataAnnotations;

namespace Web2.Models
{
    public class Order : BaseClass
    {
        public List<Item>? Items { get; set; }
        [Required, MaxLength(100)]
        public string? DeliveryAddress { get; set; }
        [Required]
        public DateTime OrderTime { get; set; }
        [Required]
        public DateTime DeliveryTime { get; set; }
        public string? Comment { get; set; }
        [Required]
        public double OrderPrice { get; set; }
        [Required]
        public bool IsCancelled { get; set; } = false;
        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
