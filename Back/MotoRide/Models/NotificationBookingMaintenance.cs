namespace MotoRide.Models
{
    public class NotificationBookingMaintenance
    {
        public int Id { get; set; }
        public  int? MaintenanceId { get; set; }
        public Maintenance? Maintenance { get; set; }
        public int? BookingId { get; set; }
        public List<Booking>? Booking { get; set; }
        public string? MaintenanceNote { get; set; }
        public bool? AcceptMaintenance { get; set; }
        public bool? AcceptCustomer { get; set; }
        public bool? Isfavourite  { get; set; }
        public int? CustomerId { get; set; }
        public double? Price { get; set; }
        public DateTime CreateAt { get; set; }
        public bool? IsActive { get; set; }

    }
}
