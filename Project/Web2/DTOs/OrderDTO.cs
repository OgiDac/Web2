namespace Web2.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string? DeliveryAddress { get; set; }
        public string? Comment { get; set; }
        public DateTime OrderTime { get; set; }
        public DateTime DeliveryTime { get; set; }
        public double OrderPrice { get; set; }
        public bool? IsCancelled { get; set; }
        public List<ItemDTO>? Items { get; set; }
    }
}
