using static MotoRide.Helper.Enum;

namespace MotoRide.Dto
{
    public class AddOwnerShopDto
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public IFormFile? Iamgelicense { get; set; }
        public string? Location { get; set; }
    }
    public class AddCustomerDto
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Location { get; set; }
    }
    public class AddUserDto
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
     
        public string? UserType { get; set; }
    }
    public class LoginDto
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
    public class UpdateCustomerDto
    {
        public int Id { get; set; }

        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Location { get; set; }
        public string? Gender { get; set; }

        public DateTime? BirthDay { get; set; }
    }
    public class AllowLoginDto
    {
            public int Id { get; set; }

        public bool? IsCanLogin { get; set; }
    }
}
