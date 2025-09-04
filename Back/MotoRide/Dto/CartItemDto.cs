using MotoRide.Models;

namespace MotoRide.Dto
{
    public class AddCartItemDto
    {
        public int? Quantity { get; set; }
        public int? ProductId { get; set; }
        public int? MotorcycleId { get; set; }
        public int? CartId { get; set; }
        public string? Color { get; set; }
        public string? Size { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? CustomerId { get; set; }

    }
    public class UpdateCartItemDto
    {
        public int CartItemId { get; set; }
        public int? Quantity { get; set; }
        public int? ProductId { get; set; }
        public int? MotorcycleId { get; set; }
        public int? CartId { get; set; }
        public Cart? Cart { get; set; }
        public string? Color { get; set; }
        public string? Size { get; set; }
        public int? CustomerId { get; set; }

    }
}
