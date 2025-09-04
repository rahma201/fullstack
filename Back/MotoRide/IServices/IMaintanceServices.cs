using INTEGRATEDAPI.Shared;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface IMaintanceServices
    {
        public Task<ServiceResponse> GetAllMaintance();
        public Task<ServiceResponse> GetMaintanceById(int id);
        public Task<ServiceResponse> UpdateProfileMaintance(UpdateMaintanceDto dto);
        public Task<ServiceResponse> UpdateWorkHourse(UpdateWorkHourseDto dto);
        public Task<ServiceResponse> GetAllMaintanceAccept();
        public Task<ServiceResponse> GetAllMaintanceNotReplay();
        public Task<ServiceResponse> GetAllMaintanceReject();
        public  Task<ServiceResponse> GetAllMaintanceByCategory(int categoryMaintenanceId);
        public Task<ServiceResponse> GetAllServicesForMaintance(int maintenanceId);
        public Task<ServiceResponse> SearchMaintenance(string? name);
        public Task<ServiceResponse> AllowMointenanceToLogin(AllowLoginDto dto);

   public  Task<ServiceResponse> GetHowManyBookinMaintance(int id);
   public  Task<ServiceResponse> GetHowManyBookinMaintanceReject(int id);
   public  Task<ServiceResponse> GetMaintenanceStats(int maintenanceId);
   public  Task<ServiceResponse> GetTopCustomers(int maintenanceId);
   public  Task<ServiceResponse> GetMonthlyAchievements(int maintenanceId);
   public  Task<ServiceResponse> GetCountMaintenanceInDay(int maintenanceId);
        public Task<ServiceResponse> GetCountMaintenanceInYear(int maintenanceId);
        public  Task<ServiceResponse> TopMostPopularityMaintenance();

        public Task<ServiceResponse> GetWorkHourseByMaintanceId(int maintenanceId);
    }
}
