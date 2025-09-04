namespace MotoRide.Models
{
    public class WishList
    {
       public int WishListId { get; set; }
      
        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public int? ProductId { get; set; }
        public Product? Product { get; set; }
        public int? MotorcycleId { get; set; }
        public Motorcycle? Motorcycle { get; set; }
        public DateTime? CreatedAt { get; set; }

        public bool? IsActive { get; set; }
    }
}
