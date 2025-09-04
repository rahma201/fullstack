using INTEGRATEDAPI.Shared;
using MotoRide.Dto;
using MotoRide.Models;

namespace MotoRide.IServices
{
    public interface ICategoryMaintenancesServices
    {
        public Task<ServiceResponse> GetCategoryMaintenances(int CategoryMaintenancesId);
        public Task<ServiceResponse> GetAllCategoryMaintenances();
        public Task<ServiceResponse> AddCategoryMaintenances(string name);
        public Task<ServiceResponse> UpdateCategoryMaintenances(CategoryMaintenanceDto c);
        public Task<ServiceResponse> DeleteCategoryMaintenances(int CategoryMaintenancesId);
    }
}
