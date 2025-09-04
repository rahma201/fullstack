using INTEGRATEDAPI.Shared;
using MotoRide.Dto;
using MotoRide.Models;

namespace MotoRide.IServices
{
    public interface INotificationBookingMaintenanceServices
    {
        public Task<ServiceResponse> GetNotificationBookingMaintenance(int notificationBookingMaintenanceId);
        public Task<ServiceResponse> GetAllNotificationBookingMaintenance(int bookingId);
        public Task<ServiceResponse> AddNotificationBookingMaintenance(AddNotificationBookingMaintenanceDto dto);
        public Task<ServiceResponse> AddFastNotificationBookingMaintenance(AddNotificationBookingMaintenanceDto dto);

        public Task<ServiceResponse> AddResponseforNotificationBookingFromCustomer(UpdateNotificationBookingMaintenanceDto dto);
        public Task<ServiceResponse> DeleteNotificationBookingMaintenance(int notificationBookingMaintenanceId);
        public Task<ServiceResponse> GetAllNotificationBookingMaintenanceByMaintenance(int maintenanceId);
        public Task<ServiceResponse> GetAllNotificationRejectCustomerForMaintenance(int maintenanceId);
        public Task<ServiceResponse> GetAllNotificationRejectCustomer(int id);
        public Task<ServiceResponse> GetAllNotificationNotReplayCustomer(int id);
        public Task<ServiceResponse> AddNotificationFavourite(int notificationId);
        public Task<ServiceResponse> DeleteNotificationFavourite(int notificationId);
        public Task<ServiceResponse> GetAllNotificationfavouriteCustomer(int id);

    }
}
