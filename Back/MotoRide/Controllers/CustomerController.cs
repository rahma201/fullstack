using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Migrations;
using MotoRide.Models;
using MotoRide.Services;

namespace MotoRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IAuthenticationServices _authentication;
        private readonly IProductSerives _serives;
        private readonly IMotocyleService _motocyleService;
        private readonly ICartServices _cart;
        private readonly ICartItemServices _cartItem;
        private readonly ICustomerServices _customer;
        private readonly IOrderServices _order;
        private readonly IWishListServices _wishList;
        private readonly IReviewServices _reviewServices;
        private readonly IReviewMaintenanceServies _reviewMaintenanceServies;

        private readonly IBookingServices _bookingServices;
        private readonly IMaintanceServices _maintanceServices;
        private readonly INotificationBookingMaintenanceServices _notificationBookingMaintenance;
        public CustomerController(IAuthenticationServices authentication, IProductSerives serives,IOrderServices order,ICartItemServices cartItem,ICartServices cart,IWishListServices wishList,IMotocyleService motocyle 
            ,IReviewServices reviewServices, IBookingServices bookingServices, IMaintanceServices maintanceServices,
            INotificationBookingMaintenanceServices notificationBookingMaintenance,
            ICustomerServices customer, IReviewMaintenanceServies reviewMaintenanceServies)
        {
            _authentication = authentication;
            _serives = serives;
            _cart = cart;
            _cartItem = cartItem;
            _order = order;
            _wishList = wishList;
            _motocyleService = motocyle;
            _reviewServices = reviewServices;
             _bookingServices = bookingServices;
            _maintanceServices = maintanceServices;
            _notificationBookingMaintenance = notificationBookingMaintenance;
            _customer=customer;
            _reviewMaintenanceServies = reviewMaintenanceServies;
        }
     
        #region Product
        [HttpGet("GetProductbyCategory/${id}")]
        public async Task<IActionResult> GetProductbyCategory(int id)
        {
            var response = await _serives.GetProductbyCategory(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllProduct")]
        public async Task<IActionResult> GetAllProduct()
        {
            var response = await _serives.GetAllProduct();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("TopMostPopularityMotorcycle")]
        public async Task<IActionResult> TopMostPopularityMotorcycle()
        {
            var response = await _motocyleService.TopMostPopularityMotorcycle();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);

        }

    
    [HttpGet("TopMostPopularityMaintenance")]
    public async Task<IActionResult> TopMostPopularityMaintenance()
    {
        var response = await _maintanceServices.TopMostPopularityMaintenance();
        if (response.Success) { return Ok(response); }
        return BadRequest(response);

    }

    [HttpGet("TopMostPopularityProduct")]
        public async Task<IActionResult> TopMostPopularityProduct()
        {
            var response = await _serives.TopMostPopularityProduct();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllProduct/${storeId}")]
        public async Task<IActionResult> GetAllProduct(int storeId)
        {
            var response = await _serives.GetAllProduct(storeId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetProduct/${id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var response = await _serives.GetProduct(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("SearchProduct")]
        public async Task<IActionResult> SearchProduct(string? name)
        {
            var response = await _serives.SearchProduct(name);
            if (response.Success)
            { return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("FilteringProduct")]
        public async Task<IActionResult> FilteringProduct(int shopId,string? sortby, string? color, decimal? startPrice, decimal? endPrice)
        {
            var response = await _serives.FilteringProduct(shopId,sortby, color,startPrice,endPrice);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        #endregion
        #region Motorcycle
        [HttpGet("GetMotorcycle/${id}")]
        public async Task<IActionResult> GetMotorcycle(int id)
        {
            var response = await _motocyleService.GetMotorcycle(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllUsedMotorcycle/${storeId}")]
        public async Task<IActionResult> GetAllUsedMotorcycle(int storeId)
        {
            var response = await _motocyleService.GetAllUsedMotorcycle(storeId);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllMotorcycle/${storeId}")]
        public async Task<IActionResult> GetAllMotorcycle(int storeId)
        {
            var response = await _motocyleService.GetAllMotorcycle(storeId);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllMotorcycle")]
        public async Task<IActionResult> GetAllMotorcycle()
        {
            var response = await _motocyleService.GetAllMotorcycle();
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllNewMotorcycle/${storeId}")]
        public async Task<IActionResult> GetAllNewMotorcycle(int storeId)
        {
            var response = await _motocyleService.GetAllNewMotorcycle(storeId);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("SearchMotorcycle")]
        public async Task<IActionResult> SearchMotorcycle(string? name)
        {
            var response = await _motocyleService.SearchMotorcycle(name);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("FilteringMotorcycle")]
        public async Task<IActionResult> FilteringMotorcycle(int shopId,string? sortby, string? color, decimal? startPrice, decimal? endPrice, decimal? mileage, int? year)
        {
            var response = await _motocyleService.FilteringMotorcycle(shopId,sortby, color, startPrice, endPrice, mileage, year);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        #endregion
        #region Cart
        [HttpGet("GetCart/${id}")]
        public async Task<IActionResult> GetCart(int id)
        {
            var response = await _cart.GetCart(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetCartByCustomerId/${id}")]
        public async Task<IActionResult> GetCartByCustomerId(int id)
        {
            var response = await _cart.GetCartByCustomerId(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPost("AddCart")]
        public async Task<IActionResult> AddCart([FromBody] AddCartDto dto)
        {
            var response = await _cart.AddCart(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpDelete("DeleteCart/${id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var response = await _cart.DeleteCart(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
        #region CartItem
        [HttpGet("GetItemsInCart/${id}")]
        public async Task<IActionResult> GetItemsInCart(int id)
        {
            var response = await _cartItem.GetItemsInCart(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPost("AddItemInCart")]

        public async Task<IActionResult> AddItemInCart([FromBody] AddCartItemDto dto)
        {
            var response = await _cartItem.AddItemInCart(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
      
        [HttpDelete("DeleteItemInCart/${id}")]
        public async Task<IActionResult> DeleteItemInCart(int id)
        {
            var response = await _cartItem.DeleteItemInCart(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
        #region Order
        [HttpGet("GetOrder/${id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var response = await _order.GetOrder(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetOrderDetails/${id}")]
        public async Task<IActionResult> GetOrderDetails(int id)
        {
            var response = await _order.GetOrderDetails(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllOrderforUser/${id}")]
        public async Task<IActionResult> GetAllOrderforUser(int id)
        {
            var response = await _order.GetAllOrderforUser(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPost("AddOrder")]
        public async Task<IActionResult> AddOrder(AddOrderDto dto)
        {
            var response = await _order.AddOrder(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPut("UpdateOrder")]
        public async Task<IActionResult> UpdateOrder([FromBody] UpdateOrderDto dto)
        {
            var response = await _order.UpdateOrder(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        [HttpDelete("DeleteOrder/${id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var response = await _order.DeleteOrder(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
        #region Review
     
        [HttpPost("AddReview")]
        public async Task<IActionResult> AddReview(AddReviewDto dto)
        {

            var response = await _reviewServices.AddReview(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        [HttpPost("AddReviewMaintenance")]
        public async Task<IActionResult> AddReviewMaintenance(AddReviewMaintenanceDto dto)
        {

            var response = await _reviewMaintenanceServies.AddReviewMaintenance(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        #endregion
        #region Wishlist
        [HttpPost("AddWishList")]
        public async Task<IActionResult> AddWishList(AddWishListDto dto)
        {

            var response = await _wishList.AddWishList(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetWishList/${customerId}")]
        public async Task<IActionResult> GetWishList([FromRoute]int customerId)
        {

            var response = await _wishList.GetWishList(customerId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpDelete("DeleteWishList/${id}")]
        public async Task<IActionResult> DeleteWishList(int id)
        {

            var response = await _wishList.DeleteWishList(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
        #region Booking

     
        [HttpGet("GetBooking/{bookingId}")]
        public async Task<IActionResult> GetBooking(int bookingId)
        {
            var response = await _bookingServices.GetBooking(bookingId);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpGet("GetAllBookingAcceptforCustomer/${id}")]
        public async Task<IActionResult> GetAllBookingAcceptforCustomer (int id)
        {
            var response = await _bookingServices.GetAllBookingAcceptforCustomer(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllBookingPreviousforCustomer/${id}")]
        public async Task<IActionResult> GetAllBookingPreviousforCustomer(int id)
        {
            var response = await _bookingServices.GetAllBookingPreviousforCustomer(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllBookingnotConfirmforCustomer/${id}")]
        public async Task<IActionResult> GetAllBookingnotConfirmforCustomer(int id)
        {
            var response = await _bookingServices.GetAllBookingnotConfirmforCustomer(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllBookingNotReplyforCustomer/${id}")]
        public async Task<IActionResult> GetAllBookingNotReplyforCustomer(int id)
        {
            var response = await _bookingServices.GetAllBookingNotReplyforCustomer(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpPost("AddBooking")]
        public async Task<IActionResult> AddBooking([FromForm] AddBookingDto dto)
        {
            var response = await _bookingServices.AddBooking(dto);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);

        }
        [HttpPost("AddSpecificBooking")]
        public async Task<IActionResult> AddSpecificBooking([FromForm] AddBookingSpecificBookingDto dto)
        {
            var response = await _bookingServices.AddSpecificBooking(dto);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);

        }
        [HttpPut("AddResponseforNotificationBookingFromCustomer")]
        public async Task<IActionResult> AddResponseforNotificationBookingFromCustomer([FromBody] UpdateNotificationBookingMaintenanceDto dto)
        {
            var response = await _notificationBookingMaintenance.AddResponseforNotificationBookingFromCustomer(dto);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetNotificationBookingMaintenance/{id}")]
        public async Task<IActionResult> GetNotificationBookingMaintenance(int id)
        {
            var response = await _notificationBookingMaintenance.GetNotificationBookingMaintenance(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
      
        [HttpGet("GetAllNotificationNotReplayCustomer/{id}")]
        public async Task<IActionResult> GetAllNotificationNotReplayCustomer(int id)
        {
            var response = await _notificationBookingMaintenance.GetAllNotificationNotReplayCustomer(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllNotificationfavouriteCustomer/{id}")]
        public async Task<IActionResult> GetAllNotificationfavouriteCustomer(int id)
        {
            var response = await _notificationBookingMaintenance.GetAllNotificationfavouriteCustomer(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpGet("GetAllNotificationRejectCustomer/{id}")]
        public async Task<IActionResult> GetAllNotificationRejectCustomer(int id)
        {
            var response = await _notificationBookingMaintenance.GetAllNotificationRejectCustomer(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpPut("AddNotificationFavourite/{id}")]
        public async Task<IActionResult> AddNotificationFavourite(int id)
        {
            var response = await _notificationBookingMaintenance.AddNotificationFavourite(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpPut("DeleteNotificationFavourite/{id}")]
        public async Task<IActionResult> DeleteNotificationFavourite(int id)
        {
            var response = await _notificationBookingMaintenance.DeleteNotificationFavourite(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        #endregion 
        [HttpGet("GetCustomerProfile/${id}")]
        public async Task<IActionResult> GetCustomerProfile(int id)
        {
            var response = await _authentication.GetCustomerProfile(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPut("editeCustomerProfile")]
        public async Task<IActionResult> GetCustomerProfile(UpdateCustomerDto dto)
        {
            var response = await _customer.UpdateCustomer(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
    }
}
