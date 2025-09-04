using INTEGRATEDAPI.Shared;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface IProductSerives
    {
        public Task<ServiceResponse> GetProduct(int productId);
        public Task<ServiceResponse> GetAllProduct();
        public  Task<ServiceResponse> GetAllProduct(int storeId);
        public Task<ServiceResponse> GetProductByShop(int shopId); 
        public Task<ServiceResponse> AddProduct(AddProductDto dto, IFormFile? productImageFile);
        public  Task<ServiceResponse> GetProductbyCategory(int categoryId);
        public Task<ServiceResponse> UpdateProduct(UpdateProductDto dto, IFormFile? images);
        public Task<ServiceResponse> DeleteProduct( int productId);

        public Task<ServiceResponse> SearchProduct(string name);
        public Task<ServiceResponse> MostPopularityProduct();
        public Task<ServiceResponse> FilteringProduct(int shopId,string? sortBy, string? color, decimal? startPrice, decimal? EndPrice);
        public  Task<ServiceResponse> TopMostPopularityProduct();
    }
}
