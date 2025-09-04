using Microsoft.EntityFrameworkCore;

namespace MotoRide.Models
{
    public class Motorcycle 
    {
        public int MotorcycleId { get; set;}
        public string? Name { get; set;}
        public string? Description { get; set; }
        public string? Colors { get; set; }
        public decimal Price { get; set; }
        public string? EngineType { get; set; }  // نوع المحرك
        public int? Year { get; set; }  // سنة الصنع
        public decimal? Mileage { get; set; }  // المسافة المقطوعة (الكيلومترات)
        public string? Condition { get; set; }  // الحالة (جديد أو مستعمل)
        public int? StockQuantity { get; set; }
        public string? Images { get; set; }
        public string? Brand { get; set; }
        public int StoreId { get; set;}
        public int? RemainingQuantity { get; set; }
        public Store? Store { get;set;}
        public List<Review>? Reviews { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsActive { get; set; }
    }
    
}
