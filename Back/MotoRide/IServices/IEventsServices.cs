using INTEGRATEDAPI.Shared;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface IEventsServices
    {
        public Task<ServiceResponse> GetAllOldEvents();
        public Task<ServiceResponse> GetEventById(int eventId);
        public Task<ServiceResponse> AddEvent(AddEventDto dto);
        public Task<ServiceResponse> AddResponseEventFromGoverments(AddResponseEventFromGovermentDto dto);
        public Task<ServiceResponse> GetAllAcceptResponseEventFromGoverments();
        public Task<ServiceResponse> GetAllRejectResponseEventFromGoverments();

        public Task<ServiceResponse> GetAllEventWaitResponseFromGoverments();
        public Task<ServiceResponse> GetAllEventDoesNotSendToGoverments();

        public  Task<ServiceResponse> SendEventToGoverments(int id);
        public  Task<ServiceResponse> JoinEvents(TiketsDto dto);
        public Task<ServiceResponse> GetAllUserJoinEvents(int id);
        public Task<ServiceResponse> GetAllNewEvents();
    }
}
