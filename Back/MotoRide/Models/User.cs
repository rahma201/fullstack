namespace MotoRide.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? UserType { get; set; }
        public DateTime? CreatedAt { get; set; }

        public bool? IsActive { get; set; }
        public string? Token { get; internal set; }
    }
}
