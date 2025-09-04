namespace MotoRide.Models
{

    public class Review
    {
        public int ReviewId { get; set; }
        public string? Comment { get; set; }
        public  bool? StoreNeedDeletedReview { get; set; }
        public string? StoreReason { get; set; }
        public bool? AdminNeedDeletedReview { get; set; }
        public int? StoreId { get; set; }
  
        public Store? Store { get; set; }
        public int? Rating { get; set; }
        public int? CustomerId { get; set; }
        public int? ProductId { get; set; }
        public int? MotorcycleId { get; set; }
        public Motorcycle? Motorcycle { get; set; }
        public Product? Product { get; set; }
        public Customer? Customer { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsActive { get; set; }
    }
}
