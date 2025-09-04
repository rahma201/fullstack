namespace MotoRide.Models
{
    public class WorkHours
    {
            public int WorkHoursId { get; set; }

        // Change to TimeSpan? for EF compatibility
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

        public Maintenance? Maintenance { get; set; }
        public int? MaintanenceId { get; set; }
    }

}
