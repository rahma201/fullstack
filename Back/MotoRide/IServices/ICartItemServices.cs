using INTEGRATEDAPI.Shared;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface ICartItemServices
    {
        public Task<ServiceResponse> GetItemsInCart(int cartId);
        public Task<ServiceResponse> AddItemInCart(AddCartItemDto dto);
        public Task<ServiceResponse> DeleteItemInCart(int cartItemId);
    }
}