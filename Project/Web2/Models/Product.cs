using System.ComponentModel.DataAnnotations;

namespace Web2.Models
{
    public class Product : BaseClass
    {
        [Required, MaxLength(100)]
        public string? Name { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required, MaxLength(200)]
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        [Required]
        public int SellerId { get; set; }
        public User? Seller { get; set; }
    }
}
