namespace MotoRide.Models
{
 public class Event
    {
        public int Id { get; set; }

        public string? Title{ get; set; }
        public string? Description { get; set; }
        //نقطة تجمع
        public string? startRouts { get; set; }
        public string? EndRouts { get; set; }
        public DateTime? Time { get; set; }
        public int? Duration { get; set; }

        public int? MaxParticipaion { get; set; }
        public float? price { get; set; }
        public bool? IsApproved { get; set; }
        public DateTime? CreatAt { get; set; }
        public bool? SendToGoverment { get; set; }
        public string? EventType { get; set; }
        public bool? HaveTrollyProvider { get; set; }


    }
}
