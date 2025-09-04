using MotoRide.Models;

namespace MotoRide.Dto
{
    public class CardMotorcycleDto
    {
        public int MotorcycleId { get; set; }
        public string? Name { get; set; }
        public int? CategoryId { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }
        public string? Images { get; set; }
        public int StoreId { get; set; }
        public int? RemainingQuantity { get; set; }
        
    }
    public class AddMotorcycleDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? CategoryId { get; set; }
        public string? Colors { get; set; }
        public decimal Price { get; set; }
        public string? EngineType { get; set; }  // نوع المحرك
        public int? Year { get; set; }  // سنة الصنع
        public decimal? Mileage { get; set; }  // المسافة المقطوعة (الكيلومترات)
        public string? Condition { get; set; }  // الحالة (جديد أو مستعمل)
        public int? StockQuantity { get; set; }
        public string? Images { get; set; }
        public string? Status { get; set; }
        public string? Brand { get; set; }
        public int StoreId { get; set; }
        public DateTime? CreatedAt { get; set; }

    }
    public class UpdateMotorcycleDto
    {
        public int MotorcycleId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? CategoryId { get; set; }
        public string? Colors { get; set; }
        public decimal Price { get; set; }
        public string? EngineType { get; set; }  // نوع المحرك
        public int? Year { get; set; }  // سنة الصنع
        public decimal? Mileage { get; set; }  // المسافة المقطوعة (الكيلومترات)
        public string? Condition { get; set; }  // الحالة (جديد أو مستعمل)
        public int? StockQuantity { get; set; }
        public string? Images { get; set; }
        public string? Brand { get; set; }
        public string? Status { get; set; }
        public int StoreId { get; set; }
    }
}
