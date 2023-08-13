using System.ComponentModel.DataAnnotations;

namespace Web2.DTOs
{
    public class CreateProductDTO
    {
        [Required, MaxLength(100)]
        public string? Name { get; set; }
        [Required, Range(0, double.MaxValue)]
        public double Price { get; set; }
        [Required, Range(1, int.MaxValue)]
        public int Amount { get; set; }
        [Required, MaxLength(200)]
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
