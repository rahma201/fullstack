namespace MotoRide.Models
{
    public class Ticket
    {
        public int? Id { get; set; }
        public int? EventId { get; set; }
        public Event? Event { get; set; }
        public int? UserId { get; set; }
        public Customer? User { get; set; }
        public int? NumberOfGuest {get; set;}
        public DateTime? CreateAt {get; set;}


    }
}
