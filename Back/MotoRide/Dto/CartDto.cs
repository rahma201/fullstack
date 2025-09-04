using MotoRide.Models;

namespace MotoRide.Dto
{
    public class AddCartDto
    {
        public int? CustomerId { get; set; }
        public int? OrderId { get; set; }
     
        public DateTime? CreatedAt { get; set; }
        public string? CreatedBy { get; set; }

    }

    public class UpdateCartDto
    {
        public int CartId { get; set; }
        public int? CustomerId { get; set; }
        public int? OrderId { get; set; }
      
    }
}
