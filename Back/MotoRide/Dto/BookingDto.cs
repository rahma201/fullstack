using MotoRide.Models;

namespace MotoRide.Dto
{
    public class AddBookingDto
    {
        public string? Title { get; set; }
        
        public DateTime? Date { get; set; }
        public string? CustomerNote { get; set; }
        public int? CustomerId { get; set; }
        public string? Location { get; set; }
        public string? BikeType { get; set; } // مثال: "هوائية", "كهربائية"
        public IFormFile? ImageUrl { get; set; } // رابط الصورة
    }
    public class UpdateBookingDto
    {
        public int BookingId { get; set; }
        public string? Title { get; set; }

        public DateTime? Date { get; set; }
        public string? CustomerNote { get; set; }
        public int? CustomerId { get; set; }
        public int? MaintenanceId { get; set; }
        public string? StatusBookingMaintenance { get; set; }
        public string? MaintenanceNote { get; set; }
        public int? PaymentmethodId { get; set; }
        public string? Location { get; set; }
        public string? BikeType { get; set; } // مثال: "هوائية", "كهربائية"
        public IFormFile? ImageUrl { get; set; } // رابط الصورة

    }

    public class AddResponseBookingDto
    {
        public int BookingId { get; set; }
        public int? MaintenanceId { get; set; }
        public string? MaintenanceNote { get; set; }
        public float? TotalPrice { get; set; }

        public bool? IsAcceptableUserBooking { get; set; }

    }
    public class AddBookingSpecificBookingDto
    {
        public int MaintenanceId { get; set; }

        public string? Title { get; set; }

        public DateTime? Date { get; set; }
        public string? CustomerNote { get; set; }
        public int? CustomerId { get; set; }
        public string? Location { get; set; }
        public string? BikeType { get; set; } // مثال: "هوائية", "كهربائية"
        public IFormFile? ImageUrl { get; set; } // رابط الصورة
    }

    
}
