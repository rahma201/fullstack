using INTEGRATEDAPI.Shared;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface IAuthenticationServices
    {
        public Task<ServiceResponse> Login(LoginDto dto);
        public Task<ServiceResponse> RegisterCustomer(AddCustomerDto dto);
        public  Task<ServiceResponse> AddUser(AddUserDto dto);
       public Task<ServiceResponse> RegisterOwnerShop(AddOwnerShopDto dto);
        public Task<ServiceResponse> ResetPassword(string email, string newPassword);
        public Task<ServiceResponse> Logout(int id);
        public Task<ServiceResponse> GetCustomerProfile(int id);
        public  Task<ServiceResponse> RegisterMaintenance(AddMaintenanceDto dto);
        public Task<ServiceResponse> GetAllGovernment();
        public Task<ServiceResponse> LoginGoverment(LoginDto dto);



    }
}
