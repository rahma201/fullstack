namespace MotoRide.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Sizes { get; set; }
        public string? Colors { get; set; }
        public string? Images { get; set; }
        public decimal Price { get; set; }
        public int? CategoryProductId { get; set; }
       public CategoryProduct? SubCategory { get; set; }
        public List<Review>? Reviews { get; set; }
        public int Quantity { get; set; }
        public int? RemainingQuantity { get; set; }
        public int? StoreId { get; set; }
        public Store? Store { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsActive { get; set; }

    }
}
