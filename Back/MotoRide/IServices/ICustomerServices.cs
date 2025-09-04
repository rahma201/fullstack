using INTEGRATEDAPI.Shared;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface ICustomerServices
    {
        public Task<ServiceResponse> AddPoints(int userId, int points);
        public Task<ServiceResponse> GetLevel(int userId);
        public Task<ServiceResponse> UpdateCustomer(UpdateCustomerDto dto);
        public Task<ServiceResponse> CountGender();
        public  Task<ServiceResponse> MostAgeUsed();
    }
}
