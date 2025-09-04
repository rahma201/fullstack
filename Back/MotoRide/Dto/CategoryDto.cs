namespace MotoRide.Dto
{
    public class CategoryMaintenanceDto
    {

        public int CategoryMaintenanceId { get; set; }
        public string? Name { get; set; }
    }
    public class CategoryProductDto
    {
        public string? Name { get; set; }
        public int? StoreId { get; set; }
    }
    public class UpdateCategoryProductDto
    {
        public int CategoryProductId { get; set; }
        public string? Name { get; set; }
        public int? StoreId { get; set; }
    }
    
}
