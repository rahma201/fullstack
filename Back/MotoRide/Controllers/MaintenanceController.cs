using INTEGRATEDAPI.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;
using MotoRide.Services;

namespace MotoRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaintenanceController : ControllerBase
    {
        private readonly IBookingServices _bookingServices;
        private readonly IMaintanceServices _maintenanceService;
        private readonly IReviewMaintenanceServies _reviewMaintenanceServies;
        private readonly INotificationBookingMaintenanceServices _notificationBookingMaintenance;
        public MaintenanceController(IBookingServices bookingServices, 
            IMaintanceServices maintanceServices, 
            INotificationBookingMaintenanceServices notificationBookingMaintenance,
            IReviewMaintenanceServies reviewMaintenanceServies
            )
        {
            _bookingServices = bookingServices;
            _maintenanceService = maintanceServices;
            _notificationBookingMaintenance = notificationBookingMaintenance; 
            _reviewMaintenanceServies = reviewMaintenanceServies;
        }
        #region reviewMaintenance
        [HttpPut("DeleteReviewMaintenanceByMaintenance")]
        public async Task<IActionResult> DeleteReviewMaintenanceByMaintenance(DeleteReviewMaintenanceByMaintenanceDto dto)
        {
            var response = await _reviewMaintenanceServies.DeleteReviewMaintenanceByMaintenance(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
        #region Booking
        [HttpGet("GetAllBookingRejectforMantaince/{maintenanceId}")]
        public async Task<IActionResult> GetAllBookingRejectforMantaince(int maintenanceId)
        {
            var response = await _bookingServices.GetAllBookingRejectforMantaince(maintenanceId);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllBookingAcceptforMantaince/{maintenanceId}")]
        public async Task<IActionResult> GetAllBookingAcceptforMantaince(int maintenanceId)
        {
            var response = await _bookingServices.GetAllBookingAcceptforMantaince(maintenanceId);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllBookingNotReplyforMantaince/{maintenanceId}")]
        public async Task<IActionResult> GetAllBookingNotReplyforMantaince(int maintenanceId)
        {
            var response = await _bookingServices.GetAllBookingNotReplyforMantaince(maintenanceId);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpPost("AddNotificationBookingMaintenance")]
        public async Task<IActionResult> AddNotificationBookingMaintenance([FromBody] AddNotificationBookingMaintenanceDto dto)
        {
            var response = await _notificationBookingMaintenance.AddNotificationBookingMaintenance(dto);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
   

        [HttpGet("GetAllNotificationBookingMaintenanceByMaintenance/{maintenanceId}")]
        public async Task<IActionResult> GetAllNotificationBookingMaintenanceByMaintenance(int maintenanceId)
        {
            var response = await _notificationBookingMaintenance.GetAllNotificationBookingMaintenanceByMaintenance(maintenanceId);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllNotificationRejectCustomerForMaintenance/{maintenanceId}")]
        public async Task<IActionResult> GetAllNotificationRejectCustomerForMaintenance(int maintenanceId)
        {
            var response = await _notificationBookingMaintenance.GetAllNotificationRejectCustomerForMaintenance(maintenanceId);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        #endregion
        #region Maintance
        [HttpGet("GetAllMaintance")]
        public async Task<IActionResult> GetAllMaintance()
        {
            var response = await _maintenanceService.GetAllMaintance();
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetProfileMaintance/{id}")]
        public async Task<IActionResult> GetProfileMaintance(int id)
        {
            var response = await _maintenanceService.GetMaintanceById(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpPut("UpdateProfileMaintance")]

        public async Task<IActionResult> UpdateProfileMaintance([FromBody] UpdateMaintanceDto dto)
        {
            var response = await _maintenanceService.UpdateProfileMaintance(dto);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpPut("UpdateWorkHourse")]
        public async Task<IActionResult> UpdateWorkHourse([FromBody] UpdateWorkHourseDto dto)
        {
            Console.WriteLine($"WorkHoursId: {dto.WorkHoursId}");
            var response = await _maintenanceService.UpdateWorkHourse(dto);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }



        [HttpGet("GetAllServicesForMaintance/{id}")]
        public async Task<IActionResult> GetAllServicesForMaintance(int id)
        {
            var response = await _maintenanceService.GetAllServicesForMaintance(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetWorkHourseByMaintanceId/${id}")]
        public async Task<IActionResult> GetWorkHourseByMaintanceId(int id)
        {
            var response = await _maintenanceService.GetWorkHourseByMaintanceId(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpGet("HowManyBookings/{id}")]
        public async Task<ActionResult<ServiceResponse>> GetHowManyBooking(int id)
        {
            var response = await _maintenanceService.GetHowManyBookinMaintance(id);
            if (response.Success)
                return Ok(response);
            return BadRequest(response);
        }

        [HttpGet("HowManyBookingsReject/{id}")]
        public async Task<ActionResult<ServiceResponse>> GetHowManyBookingReject(int id)
        {
            var response = await _maintenanceService.GetHowManyBookinMaintanceReject(id);
            if (response.Success)
                return Ok(response);
            return BadRequest(response);
        }

   

        // Get Maintenance Stats by Maintenance ID
        [HttpGet("MaintenanceStats/{maintenanceId}")]
        public async Task<ActionResult<ServiceResponse>> GetMaintenanceStats(int maintenanceId)
        {
            var response = await _maintenanceService.GetMaintenanceStats(maintenanceId);
            if (response.Success)
                return Ok(response);
            return BadRequest(response);
        }

        // Get Top Customers by Maintenance ID
        [HttpGet("TopCustomers/{maintenanceId}")]
        public async Task<ActionResult<ServiceResponse>> GetTopCustomers(int maintenanceId)
        {
            var response = await _maintenanceService.GetTopCustomers(maintenanceId);
            if (response.Success)
                return Ok(response);
            return BadRequest(response);
        }

        // Get Monthly Achievements by Maintenance ID
        [HttpGet("MonthlyAchievements/{maintenanceId}")]
        public async Task<ActionResult<ServiceResponse>> GetMonthlyAchievements(int maintenanceId)
        {
            var response = await _maintenanceService.GetMonthlyAchievements(maintenanceId);
            if (response.Success)
                return Ok(response);
            return BadRequest(response);
        }

        // Get Maintenance Count for Today by Maintenance ID
        [HttpGet("CountMaintenanceInDay/{maintenanceId}")]
        public async Task<ActionResult<ServiceResponse>> GetCountMaintenanceInDay(int maintenanceId)
        {
            var response = await _maintenanceService.GetCountMaintenanceInDay(maintenanceId);
            if (response.Success)
                return Ok(response);
            return BadRequest(response);
        }

        // Get Maintenance Count for This Year by Maintenance ID
        [HttpGet("CountMaintenanceInYear/{maintenanceId}")]
        public async Task<ActionResult<ServiceResponse>> GetCountMaintenanceInYear(int maintenanceId)
        {
            var response = await _maintenanceService.GetCountMaintenanceInYear(maintenanceId);
            if (response.Success)
                return Ok(response);
            return BadRequest(response);
        }
    }
    #endregion
 

}


