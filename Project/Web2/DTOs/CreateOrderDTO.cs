using System.ComponentModel.DataAnnotations;

namespace Web2.DTOs
{
    public class CreateOrderDTO
    {
        [MaxLength(100)]
        public string? DeliveryAddress { get; set; }
        public string? Comment { get; set; }
        public List<CreateItemDTO>? Items { get; set; }
    }
}
