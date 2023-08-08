using System.ComponentModel.DataAnnotations;

namespace Web2.Models
{
    public class Item : BaseClass
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int OrderId { get; set; }
        public Order? Order { get; set; }
    }
}
