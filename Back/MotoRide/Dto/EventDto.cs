using MotoRide.Models;

namespace MotoRide.Dto
{
    public class AddEventDto
    {

        public string? Title { get; set; }
        public string? Description { get; set; }
        //نقطة تجمع
        public string? startRouts { get; set; }
        public string? EndRouts { get; set; }
        public DateTime? Time { get; set; }
        public int? Duration { get; set; }
        public int? MaxParticipaion { get; set; }
        public float? price { get; set; }

        public bool? HaveTrollyProvider { get; set; }
        public string? EventType { get; set; }

    }
    public class AddResponseEventFromGovermentDto
    {
        public int Id { get; set; }
        public bool? IsApproved { get; set; }

    }
    public class CardEventDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
         public string? startRouts { get; set; }
   
        public DateTime? Time { get; set; }
        public int? Duration { get; set; }

        public float? price { get; set; }
 public string? EventType { get; set; }
    }
    public class TiketsDto
    {
        public int? EventId { get; set; }
     
        public int? UserId { get; set; }
      
        public int? NumberOfGuest { get; set; }
      

    }
}