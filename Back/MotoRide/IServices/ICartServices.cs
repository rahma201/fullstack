using INTEGRATEDAPI.Shared;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface ICartServices
    {
        public Task<ServiceResponse> GetCart(int cartId);
        public Task<ServiceResponse> GetAllCart();
        public Task<ServiceResponse> GetCartByCustomerId(int cutomerId);
        public Task<ServiceResponse> AddCart(AddCartDto dto);
        public Task<ServiceResponse> UpdateCart(UpdateCartDto dto);
        public Task<ServiceResponse> DeleteCart(int cartId);
    }
}
