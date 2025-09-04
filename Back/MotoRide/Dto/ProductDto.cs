using MotoRide.Models;

namespace MotoRide.Dto
{
    public class AddProductDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Sizes { get; set; }
        public string? Colors { get; set; }
        public IFormFile?Images { get; set; }
        public decimal Price { get; set; }
        public int? CategoryProductId { get; set; }
        public int? StoreId { get; set; }
        public int Quantity { get; set; }

    }
    public class UpdateProductDto
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Sizes { get; set; }
        public string? Colors { get; set; }
        public IFormFile? Images { get; set; }
        public decimal Price { get; set; }
        public int? StoreId { get; set; }
        public int? CategoryProductId { get; set; }
        public int Quantity { get; set; }
   
    }
    public class CardProductDto
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public string? Images { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int? RemainingQuantity { get; set; }

    }
}
