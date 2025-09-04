namespace MotoRide.Models
{
    public class Store
    {
        public int StoreId { get; set; }
        public string? StoreName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Iamgelicense { get; set; }
        public string? Location { get; set; }
        public string? Token { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsCanLogin { get; set; }

    }
}
