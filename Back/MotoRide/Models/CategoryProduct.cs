namespace MotoRide.Models
{
    public class CategoryProduct
    {
        public int CategoryProductId { get; set; }
        public string? Name { get; set; }
        public int? StoreId { get; set; }
        public DateTime? CreatedAt { get; set; }

        public bool? IsActive { get; set; }
    }
}
