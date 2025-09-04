namespace MotoRide.Models
{
    public class ReviewMaintenance
    {
            public int ReviewMaintenanceId { get; set; }
            public string? Comment { get; set; }
            public bool? MaintenanceNeedDeletedReview { get; set; }
            public string? MaintenanceReason { get; set; }
            public bool? AdminNeedDeletedReview { get; set; }
        
            public int? MaintenanceId { get; set; }
            public Maintenance? Maintenance { get; set; }
            public int? Rating { get; set; }
            public int? CustomerId { get; set; }
          
            public Customer? Customer { get; set; }
            public DateTime? CreatedAt { get; set; }
            public bool? IsActive { get; set; }
        }
    }


