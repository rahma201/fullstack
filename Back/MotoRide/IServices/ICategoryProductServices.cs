using INTEGRATEDAPI.Shared;
using MotoRide.Dto;
using MotoRide.Models;

namespace MotoRide.IServices
{
    public interface ICategoryProductServices
    {
        public Task<ServiceResponse> GetCategoryProduct(int CategoryProductId);
        public Task<ServiceResponse> GetAllCategoryProduct();
        public Task<ServiceResponse> AddCategoryProduct(CategoryProductDto dto);
        public Task<ServiceResponse> UpdateCategoryProduct(UpdateCategoryProductDto dto);
        public Task<ServiceResponse> DeleteCategoryProduct(int CategoryProductId);
        public  Task<ServiceResponse> GetAllCategoryProductByStore(int id);
    }
}