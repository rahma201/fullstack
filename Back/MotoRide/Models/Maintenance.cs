using MotoRide.Controllers;

namespace MotoRide.Models
{
    public class Maintenance
    {
        public int Id { get; set; }
        public string? MaintenanceName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Iamgelicense { get; set; }
        public string? Location { get; set; }
        public string? Token { get; set; }
        public DateTime? CreatedAt { get; set; }
        public List<Booking>? Bookings { get; set; } // قائمة الحجوزات المرتبطة بالصيانة
        public bool? IsActive { get; set; }
        public bool? IsCanLogin { get; set; }

        // profile 
        public List<CategoryMaintenance> Categories { get; set; } 
        public string? Description { get; set; }
        public int? WorkHoursId { get; set; }
        public WorkHours? WorkHours { get; set; } 


    }
}
