namespace MotoRide.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        public string? Title { get; set; }
        public float? TotalPrice { get; set; }
        public bool? IsAcceptableUserBooking { get; set; }
        public bool? IsAcceptableMaintaince{ get; set; }
        public DateTime? Date { get; set; }
        public string? CustomerNote { get; set; } 
        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public int? MaintenanceId { get; set; }
        public Maintenance? Maintenance { get; set; }
    
        public string? StatusBookingMaintenance { get; set; }
        public string? MaintenanceNote { get; set; }
        public string? Location { get; set; }
        public string? BikeType { get; set; } // مثال: "هوائية", "كهربائية"
        public string? ImageUrl { get; set; } // رابط الصورة
        public DateTime? CreatedAt { get; set; }
        public bool? IsActive { get; set; }
    }
}
