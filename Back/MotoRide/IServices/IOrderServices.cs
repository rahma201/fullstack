using INTEGRATEDAPI.Shared;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface IOrderServices
    {
        public Task<ServiceResponse> GetOrder(int orderId);
        public Task<ServiceResponse> GetAllOrder();
        public Task<ServiceResponse> AddOrder(AddOrderDto dto);
        public Task<ServiceResponse> UpdateOrder(UpdateOrderDto d);
        public  Task<ServiceResponse> UpdateStautsOrder(List<UpdateStautsOrderDto> dto);
        public Task<ServiceResponse> DeleteOrder(int cartId);
        public  Task<ServiceResponse> GetAllOrderForthisShop(int shopId);
        public Task<ServiceResponse> GetAllOrderNotReceivedByShop(int shopId); 
        public Task<ServiceResponse> GetAllOrderReceivedByShop(int shopId);
        public Task<ServiceResponse> GetOrderByIdForthisShop(int orderId, int shopId);
        public Task<ServiceResponse> GetAllOrderforUser(int customerId);
        public  Task<ServiceResponse> GetOrderDetails(int orderId);
        public  Task<ServiceResponse> GetItemOrderNotReceivedByShop(int shopId, int orderId);
        public Task<ServiceResponse> GetItemOrderReceivedByShop(int shopId, int orderId);

    }
}
