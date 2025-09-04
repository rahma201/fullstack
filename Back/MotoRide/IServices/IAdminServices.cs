using INTEGRATEDAPI.Shared;

namespace MotoRide.IServices
{
    public interface IAdminServices
    {

        public Task<ServiceResponse> countUser();

        public Task<ServiceResponse> countProduct();

        public Task<ServiceResponse> countEvent();
        public Task<ServiceResponse> countMotorcylce();
        public Task<ServiceResponse> countBooking();
        public Task<ServiceResponse> countOrders();

        public Task<ServiceResponse> BookingInYearByMaintenance();
        public Task<ServiceResponse> OrdersInYearByShop();
        public Task<ServiceResponse> BookingInMonthByMaintnanece();
        public Task<ServiceResponse> OrdersInMonthByShop();
        public Task<ServiceResponse> BookingByMaintnanece();
        public Task<ServiceResponse> OrdersByShop();
    }
}
