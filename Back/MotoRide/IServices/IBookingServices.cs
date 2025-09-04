using INTEGRATEDAPI.Shared;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface IBookingServices 
    {
        public Task<ServiceResponse> GetBooking(int bookingId);
        public Task<ServiceResponse> AddBooking(AddBookingDto dto);
        public Task<ServiceResponse> GetAllBookingRejectforMantaince(int maintenanceId);
        public Task<ServiceResponse> GetAllBookingAcceptforMantaince(int maintenanceId);
        public  Task<ServiceResponse> GetAllBookingPreviousforCustomer(int customerId);
        public  Task<ServiceResponse> GetAllBookingNotReplyforMantaince(int MaintenanceId);

        public Task<ServiceResponse> GetAllBookingNotReplyforCustomer(int id);
        public  Task<ServiceResponse> GetAllBookingnotConfirmforCustomer(int id);
        public Task<ServiceResponse> GetAllBookingAcceptforCustomer(int id);

        public  Task<ServiceResponse> GetAllBookingConfrimed();
        public  Task<ServiceResponse> AddSpecificBooking(AddBookingSpecificBookingDto dto);
    }
}
