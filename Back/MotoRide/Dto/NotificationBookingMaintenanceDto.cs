using MotoRide.Models;

namespace MotoRide.Dto
{
    public class AddNotificationBookingMaintenanceDto
    {
        public int? MaintenanceId { get; set; }
       
        public int? BookingId { get; set; }
        public int? CustomerId { get; set; }

        public string? MaintenanceNote { get; set; }
        public double? Price { get; set; }
      

    }
    public class UpdateNotificationBookingMaintenanceDto
    {
        public int Id { get; set; }

        public bool? AcceptCustomer { get; set; }
    }
}
