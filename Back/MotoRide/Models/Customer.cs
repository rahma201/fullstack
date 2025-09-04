using static MotoRide.Helper.Enum;

namespace MotoRide.Models
{
    public class Customer 
    {
        public int CustomerId { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Location { get; set; }
        public string? Gender { get; set; }

        public DateTime? BirthDay { get; set; }
        public List<Cart>? Cart { get; set; }
        public List<Order>? Order { get; set; }
        public List<WishList>? WishList { get; set; }
        public int Points { get; set; } = 0; // النقاط المبدئية
        public UserLevel? Level { get; set; } = UserLevel.Basic; // المستوى المبدئي
        public DateTime? CreatedAt { get; set; }

        public bool? IsActive { get; set; }
        public string? Token { get; internal set; }
        public List<Booking>? Bookings { get; set; } 

    }
}
