using INTEGRATEDAPI.Shared;
using MotoRide.Dto;

namespace MotoRide.IServices
{
    public interface IReviewMaintenanceServies
    {
        public Task<ServiceResponse> GetReviewMaintenance(int reviewMaintenanceId);
  
        public Task<ServiceResponse> AddReviewMaintenance (AddReviewMaintenanceDto dto);

        public Task<ServiceResponse> DeleteReviewMaintenanceByMaintenance(DeleteReviewMaintenanceByMaintenanceDto dto);
        public Task<ServiceResponse> DeleteReviewMaintenanceByAdmain(DeleteReviewMaintenanceByAdmainDto dto);
        public Task<ServiceResponse> GetDeleteReviewMaintenance(GetDeleteReviewMaintenanceDto dto);
        public Task<ServiceResponse> GetDeleteReviewMaintenancebyAdmain();

    }
}
