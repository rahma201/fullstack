using MotoRide.Models;

namespace MotoRide.Dto
{
   public class AddMaintenanceDto
    {
         public string? MaintenanceName { get; set; }

        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public IFormFile? Iamgelicense { get; set; }
        public string? Location { get; set; }
    }

    public class UpdateMaintanceDto
    {
      public int Id { get; set; }
   public string? MaintenanceName { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Location { get; set; }
    
        public List<int>? CategoryIds{ get; set; }
        public string? MaintenanceDescription { get; set; }
        
 
}
    public class UpdateWorkHourseDto
    {
        public int WorkHoursId { get; set; }

        // استخدام DateTime لتخزين الوقت مع تاريخ افتراضي
        public string? StartSunday { get; set; }
        public string? EndSunday { get; set; }

        public string? StartMonday { get; set; }
        public string? EndMonday { get; set; }

        public string? StartTuesday { get; set; }
        public string? EndTuesday { get; set; }

        public string? StartWednesday { get; set; }
        public string? EndWednesday { get; set; }

        public string? StartThursday { get; set; }
        public string? EndThursday { get; set; }

        public string? StartFriday { get; set; }
        public string? EndFriday { get; set; }

        public string? StartSaturday { get; set; }
        public string? EndSaturday { get; set; }


        public int? MaintanenceId { get; set; }
    }





}
