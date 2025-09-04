using Microsoft.AspNetCore.Authorization;
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

    public class AdmainController : ControllerBase
    {
        private readonly IReviewMaintenanceServies _reviewMaintenanceServies;

        private readonly ICategoryMaintenancesServices _categoryServices;
        private readonly IAuthenticationServices _authenticationServices;
        private readonly IReviewServices _reviewServices;
        private readonly IStoreServices _storeServices;
        private readonly IOrderServices _Order;
        private readonly IBookingServices _bookingServices;
        private readonly IMaintanceServices _maintanceServices;
        private readonly IEventsServices _eventsServices;
        private readonly IAdminServices _admin;
        public AdmainController(ICategoryMaintenancesServices categoryServices,
            IAuthenticationServices authenticationServices,
            IReviewServices reviewServices,IStoreServices store,
            IMaintanceServices maintanceServices,
            IBookingServices bookingServices,IOrderServices order,
            IEventsServices eventsServices,
            IReviewMaintenanceServies reviewMaintenanceServies
            ,IAdminServices admin)
        {
            _categoryServices = categoryServices;
            _authenticationServices = authenticationServices;
            _reviewServices = reviewServices;
            _storeServices=store;
            _maintanceServices = maintanceServices;
            _bookingServices = bookingServices;
            _Order = order;
            _eventsServices = eventsServices;
            _admin = admin;
            _reviewMaintenanceServies=reviewMaintenanceServies;
        }
        #region Category
   
        [HttpPost("AddCategoryMaintenances")]
        public async Task<IActionResult> AddCategory(string name) { 
            var response = await _categoryServices.AddCategoryMaintenances(name);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpPut("UpdateCategoryMaintenances")]
        public async Task<IActionResult> UpdateCategoryMaintenances([FromBody] CategoryMaintenanceDto category)
        {
            var response = await _categoryServices.UpdateCategoryMaintenances(category);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpDelete("DeleteCategoryMaintenances/{id}")]
        public async Task<IActionResult> DeleteCategoryMaintenances(int id)
        {
            var response = await _categoryServices.DeleteCategoryMaintenances(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        #endregion
        #region Customer
        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser([FromBody]AddUserDto dto)
        {
            var response = await _authenticationServices.AddUser(dto);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllGovernment")]
        public async Task<IActionResult> GetAllGovernment()
        {
            var response = await _authenticationServices.GetAllGovernment();
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);

        }
        #endregion
        #region Review
        [HttpPut("DeleteReviewByAdmain")]
        public async Task<IActionResult> DeleteReviewByAdmain(DeleteRviewByAdmainDto dto)
        {

            var response = await _reviewServices.DeleteReviewByAdmain(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetDeleteReviewbyAdmain")]
        public async Task<IActionResult> GetDeleteReviewbyAdmain( )
        {

            var response = await _reviewServices.GetDeleteReviewbyAdmain();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
           [HttpPut("DeleteReviewMaintenanceByAdmain")]
        public async Task<IActionResult> DeleteReviewMaintenanceByAdmain(DeleteReviewMaintenanceByAdmainDto dto)
        {

            var response = await _reviewMaintenanceServies.DeleteReviewMaintenanceByAdmain(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetDeleteReviewMaintenancebyAdmain")]
        public async Task<IActionResult> GetDeleteReviewMaintenancebyAdmain()
        {

            var response = await _reviewMaintenanceServies.GetDeleteReviewMaintenancebyAdmain();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
        #region Store
        [HttpGet("GetAllStoreAccept")]
        public async Task<IActionResult> GetAllStoreAccept()
        {
            var response = await _storeServices.GetAllStoreAccept();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        [HttpGet("GetAllStoreNotResponse")]
        public async Task<IActionResult> GetAllStoreNotResponse()
        {
            var response = await _storeServices.GetAllStoreNotResponse();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllStoreReject")]
        public async Task<IActionResult> GetAllStoreReject()
        {
            var response = await _storeServices.GetAllStoreReject();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPut("AllowStoreToLogin")]
        public async Task<IActionResult> AllowStoreToLogin(AllowLoginDto dto)
        {
            var response = await _storeServices.AllowStoreToLogin(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPut("AllowMaintenanceToLogin")]
        public async Task<IActionResult> AllowMointenanceToLogin(AllowLoginDto dto)
        {
            var response = await _maintanceServices.AllowMointenanceToLogin(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllOrder")]
        public async Task<IActionResult> GetAllOrder()
        {
            var response = await _Order.GetAllOrder();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetOrderDetails/{id}")]
        public async Task<IActionResult> GetOrderDetails(int id)
        {
            var response = await _Order.GetOrderDetails(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
        #region Maintance

        [HttpGet("GetAllMaintanceAccept")]
        public async Task<IActionResult> GetAllMaintanceAccept()
        {
            var response = await _maintanceServices.GetAllMaintanceAccept();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllMaintanceNotReplay")]
        public async Task<IActionResult> GetAllMaintanceNotReplay()
        {
            var response = await _maintanceServices.GetAllMaintanceNotReplay();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllMaintanceReject")]
        public async Task<IActionResult> GetAllMaintanceReject()
        {
            var response = await _maintanceServices.GetAllMaintanceReject();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        #endregion
        [HttpGet("GetAllBooking")]
        public async Task<IActionResult> GetAllBookingConfrimed()
        {
            var response = await _bookingServices.GetAllBookingConfrimed();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
  
        #region Events     
        [HttpGet("GetAllRejectResponseEventFromGoverments")]
        public async Task<IActionResult> GetAllRejectResponseEventFromGoverments()
        {
            var response = await _eventsServices.GetAllRejectResponseEventFromGoverments();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
      
        [HttpGet("GetAllAcceptResponseEventFromGoverments")]
        public async Task<IActionResult> GetAllAcceptResponseEventFromGoverments()
        {
            var response = await _eventsServices.GetAllAcceptResponseEventFromGoverments();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPost("AddEvent")]
        public async Task<IActionResult> AddEvent(AddEventDto dto)
        {
            var response = await _eventsServices.AddEvent(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetEventById/{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var response = await _eventsServices.GetEventById(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllEventDoesNotSendToGoverments")]
        public async Task<IActionResult> GetAllEventDoesNotSendToGoverments()
        {
            var response = await _eventsServices.GetAllEventDoesNotSendToGoverments();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllEventWaitResponseFromGoverments")]
        public async Task<IActionResult> GetAllEventWaitResponseFromGoverments()
        {
            var response = await _eventsServices.GetAllEventWaitResponseFromGoverments();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
   
        [HttpPut("SendEventToGoverments")]
        public async Task<IActionResult> SendEventToGoverments(int id)
        {
            var response = await _eventsServices.SendEventToGoverments(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }


        [HttpGet("GetAllOldEvents")]
        public async Task<IActionResult> GetAllOldEvents()
        {
            var response = await _eventsServices.GetAllOldEvents();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        [HttpGet("GetAllNewEvents")]
        public async Task<IActionResult> GetAllNewEvents()
        {
            var response = await _eventsServices.GetAllNewEvents();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllUserJoinEvents/{id}")]
        public async Task<IActionResult> GetAllUserJoinEvents(int id)
        {
            var response = await _eventsServices.GetAllUserJoinEvents(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPut("JoinEvents")]
        public async Task<IActionResult> JoinEvents(TiketsDto dto)
        {
            var response = await _eventsServices.JoinEvents(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPut("AddResponseEventFromGoverment")]
        public async Task<IActionResult> AddResponseEventFromGoverments(AddResponseEventFromGovermentDto dto)
        {
            var response = await _eventsServices.AddResponseEventFromGoverments(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
        #region admainDashboard
        [HttpGet("countEvent")]
        public async Task<IActionResult> countEvent()
        {
            var response = await _admin.countEvent();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("countBooking")]
        public async Task<IActionResult> countBooking()
        {
            var response = await _admin.countBooking();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        [HttpGet("countOrders")]
        public async Task<IActionResult> countOrders()
        {
            var response = await _admin.countOrders();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("countUser")]
        public async Task<IActionResult> countUser()
        {
            var response = await _admin.countUser();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("BookingInYearByMaintenance")]
        public async Task<IActionResult> BookingInYearByMaintenance()
        {
            var response = await _admin.BookingInYearByMaintenance();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("BookingInMonthByMaintnanece")]
        public async Task<IActionResult> BookingInMonthByMaintnanece()
        {
            var response = await _admin.BookingInMonthByMaintnanece();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("BookingByMaintnanece")]
        public async Task<IActionResult> BookingByMaintnanece()
        {
            var response = await _admin.BookingByMaintnanece();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("OrdersByShop")]
        public async Task<IActionResult> OrdersByShop()
        {
            var response = await _admin.OrdersByShop();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("OrdersInMonthByShop")]
        public async Task<IActionResult> OrdersInMonthByShop()
        {
            var response = await _admin.OrdersInMonthByShop();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("OrdersInYearByShop")]
        public async Task<IActionResult> OrdersInYearByShop()
        {
            var response = await _admin.OrdersInYearByShop();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
    }
}
