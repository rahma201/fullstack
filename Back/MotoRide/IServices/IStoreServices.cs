using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface IStoreServices
    {
        public Task<ServiceResponse> GetAllStore();
        public  Task<ServiceResponse> AllowStoreToLogin(AllowLoginDto dto);
        public Task<ServiceResponse> GetAllStoreAccept();
        public Task<ServiceResponse> GetAllStoreReject();

        public Task<ServiceResponse> GetAllStoreNotResponse();
        public  Task<ServiceResponse> GetYearlySalesAsync(int shopId);
        public Task<ServiceResponse> TopMotorcycleSalyes(int shopId);
        public Task<ServiceResponse> TopProductSalyes(int shopId);
        public  Task<ServiceResponse> Salyes(int shopId);
     public  Task<ServiceResponse> CountMotorcycle(int shopId);
        public Task<ServiceResponse> CountProduct(int shopId);
        public Task<ServiceResponse> CountProductAndCategory(int shopId);

    }
}
