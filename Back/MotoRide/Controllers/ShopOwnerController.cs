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
    public class ShopOwnerController : ControllerBase
    {
        private readonly IAuthenticationServices _authentication;
        private readonly IProductSerives _productSerives;
        private readonly IMotocyleService _motocyleService;
        private readonly ICategoryProductServices _CategoryProductServices;
        private readonly IOrderServices _orderServices;
        private readonly ImageServices imageServices;
        private readonly IReviewServices _reviewServices;
        private readonly IStoreServices _store;
        public ShopOwnerController(IAuthenticationServices authentication, IProductSerives productSerives, IMotocyleService motocyleService,ImageServices image,
            ICategoryProductServices CategoryProduct, IOrderServices orderServices, IReviewServices reviewServices,IStoreServices store)
        {
            _authentication = authentication;
            imageServices = image;
            _productSerives = productSerives;
            _motocyleService = motocyleService;
            _CategoryProductServices = CategoryProduct;
            _orderServices = orderServices;
            _reviewServices = reviewServices;
            _store = store;
        }


        #region product
        [HttpGet("GetProductByShop/${id}")]
        public async Task<IActionResult> GetProductByShop(int id)
        {
            var response = await _productSerives.GetProductByShop(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPost("AddProduct")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddProduct([FromForm] AddProductDto dto,  IFormFile images)
        {
            var response = await _productSerives.AddProduct(dto, images);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
        [HttpPut("UpdateProduct")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateProduct([FromForm] UpdateProductDto dto, IFormFile? images)
        {
            var response = await _productSerives.UpdateProduct(dto, images);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpDelete("DeleteProduct/${id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var response = await _productSerives.DeleteProduct(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
        #region  Motocyle
        [HttpGet("GetMotocyleByShop/${id}")]
        public async Task<IActionResult> GetMotorcycleByShop(int id)
        {
            var response = await _motocyleService.GetMotorcycleByShop(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPost("AddMotorcycle")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddMotorcycle([FromForm] AddMotorcycleDto dto, IFormFile? images)
        {
            var response = await _motocyleService.AddMotorcycle(dto, images);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPut("UpdateMotorcycle")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateMotorcycle([FromForm] UpdateMotorcycleDto dto ,IFormFile? images)
        {
            var response = await _motocyleService.UpdateMotorcycle(dto, images);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpDelete("DeleteMotorcycle/${id}")]
        public async Task<IActionResult> DeleteMotorcycle(int id)
        {
            var response = await _motocyleService.DeleteMotorcycle(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
      
        [HttpGet("MonthMotorcycleSalyes/${id}")]
        public async Task<IActionResult> MonthMotorcycleSalyes(int id)
        {
            var response = await _motocyleService.MonthMotorcycleSalyes(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("YearMotorcycleSalyes/${id}")]
        public async Task<IActionResult> YearMotorcycleSalyes(int id)
        {
            var response = await _motocyleService.YearMotorcycleSalyes(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("CountSalesByShopId/{shopId}")]
        public async Task<IActionResult> countSalesByShopId(int shopId)
        {
            var response = await _motocyleService.countSalesByShopId(shopId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("TopMotorcycleSalyes/{shopId}")]
        public async Task<IActionResult> TopMotorcycleSalyes(int shopId)
        {
            var response = await _store.TopMotorcycleSalyes(shopId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("TopProductSalyes/{id}")]
        public async Task<IActionResult> TopProductSalyes(int id)
        {
            var response = await _store.TopProductSalyes(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetYearlySalesAsync/{shopId}")]
        public async Task<IActionResult> GetYearlySalesAsync(int shopId)
        {
            var response = await _store.GetYearlySalesAsync(shopId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
       
    }
    [HttpGet("Salyes/{shopId}")]
    public async Task<IActionResult> Salyes(int shopId)
    {
        var response = await _store.Salyes(shopId);
        if (response.Success) { return Ok(response); }
        return BadRequest(response);
    }
        [HttpGet("CountMotorcycle/{id}")]
        public async Task<IActionResult> CountMotorcycle(int id)
        {
            var response = await _store.CountMotorcycle(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("CountProduct/{shopId}")]
        public async Task<IActionResult> CountProduct(int shopId)
        {
            var response = await _store.CountProduct(shopId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("CountProductAndCategory/{shopId}")]
        public async Task<IActionResult> CountProductAndCategory(int shopId)
        {
            var response = await _store.CountProductAndCategory(shopId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
        #region CategoryProduct
        [HttpGet("GetCategoryProduct/${id}")]
        public async Task<IActionResult> GetCategoryProduct(int id)
        {
            var response = await _CategoryProductServices.GetCategoryProduct(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
      
        [HttpPost("AddCategoryProduct")]
        public async Task<IActionResult> AddCategoryProduct([FromBody] CategoryProductDto sc)
        {
            var response = await _CategoryProductServices.AddCategoryProduct(sc);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPut("UpdateCategoryProduct")]
        public async Task<IActionResult> UpdateCategoryProduct([FromBody] UpdateCategoryProductDto sc)
        {
            var response = await _CategoryProductServices.UpdateCategoryProduct(sc);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpDelete("DeleteCategoryProduct/${id}")]
        public async Task<IActionResult> DeleteCategoryProduct(int id)
        {
            var response = await _CategoryProductServices.DeleteCategoryProduct(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        #endregion
        #region Order
        [HttpGet("GetAllOrderForthisShop/${orderId}")]
        public async Task<IActionResult> GetAllOrderForthisShop(int orderId)
        {
            var response = await _orderServices.GetAllOrderForthisShop(orderId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllOrderNotReceivedByShop/${shopId}")]
        public async Task<IActionResult> GetAllOrderNotReceivedByShop(int shopId)
        {
            var response = await _orderServices.GetAllOrderNotReceivedByShop(shopId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllOrderReceivedByShop/${shopId}")]
        public async Task<IActionResult> GetAllOrderReceivedByShop(int shopId)
        {
            var response = await _orderServices.GetAllOrderReceivedByShop(shopId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetOrderByIdForthisShop/${orderId}/${shopId}")]
        public async Task<IActionResult> GetOrderByIdForthisShop(int orderId,int shopId)
        {
            var response = await _orderServices.GetOrderByIdForthisShop(orderId, shopId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetItemOrderNotReceivedByShop/${orderId}/${shopId}")]
        public async Task<IActionResult> GetItemOrderNotReceivedByShop(int orderId, int shopId)
        {
            var response = await _orderServices.GetItemOrderNotReceivedByShop(orderId, shopId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetItemOrderReceivedByShop/${orderId}/${shopId}")]
        public async Task<IActionResult> GetItemOrderReceivedByShop(int orderId, int shopId)
        {
            var response = await _orderServices.GetItemOrderReceivedByShop(orderId, shopId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPut("UpdateStautsOrder")]
        public async Task<IActionResult> UpdateStautsOrder(List<UpdateStautsOrderDto> dto)
        {
            var response = await _orderServices.UpdateStautsOrder(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        #endregion
        #region Review
        [HttpPut("DeleteReviewByStore")]
        public async Task<IActionResult> DeleteReviewByStore(DeleteRviewByStoreDto dto)
        {

            var response = await _reviewServices.DeleteReviewByStore(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion

    }
}