
namespace MotoRide.Models
{

    public class CategoryMaintenance 
    {
        public int CategoryMaintenanceId { get; set; }
        public string? Name { get; set; }
        public DateTime? CreatedAt { get; set; }
        public List<Maintenance>? Maintenance { get; set; } 
        public bool? IsActive { get; set; }
    }
}
