using MotoRide.Models;

namespace MotoRide.Dto
{
    public class AddOrderDto
    { 
        public string? Title { get; set; }
        public float? TotalPrice { get; set; }
        public string? CustomerNote { get; set; }
        public DateTime? RecivingDate { get; set; }
        public int? CustomerId { get; set; }
        public string? StatusPayment { get; set; }
        public string? Location { get; set; }
        public string? Phone { get; set; }
    }
    public class UpdateOrderDto
    {
        public int OrderId { get; set; }
        public string? Title { get; set; }
        public float? TotalPrice { get; set; }
        public DateTime? Date { get; set; }
        public float? Fee { get; set; }//الرسوم
        public string? CustomerNote { get; set; }
    
        public DateTime? RecivingDate { get; set; }
        public int? CustomerId { get; set; }
        public int? ShopOwnerId { get; set; } 

    }
    public class UpdateStautsOrderDto
    {
        public int OrderItemId { get; set; }
        public bool? StatusDelivery { get; set; }    }
}
