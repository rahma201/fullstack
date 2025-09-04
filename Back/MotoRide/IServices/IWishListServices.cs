using INTEGRATEDAPI.Shared;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface IWishListServices
    {
        Task<ServiceResponse> AddWishList(AddWishListDto dto);
        public Task<ServiceResponse> GetWishList(int customerId);
        Task<ServiceResponse> DeleteWishList(int id);

    }
}
