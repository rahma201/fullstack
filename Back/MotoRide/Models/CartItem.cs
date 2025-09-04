namespace MotoRide.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }
        public int? Quantity { get; set; }
        public int? ProductId { get; set; }
        public Product? Product { get; set; }
        public int? MotorcycleId { get; set; }
        public Motorcycle? Motorcycle { get; set; }
        public int? CartId { get; set; }
        public Cart? Cart { get; set; }
        public string? Color { get; set; }
        public string? Size { get; set; }
        public DateTime? CreatedAt { get; set; }

        public bool? IsActive { get; set; }

    }
}
