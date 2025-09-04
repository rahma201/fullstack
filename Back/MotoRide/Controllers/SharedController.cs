using Azure;
using INTEGRATEDAPI.Shared;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;
using MotoRide.Services;
using System.Net;
using System.Numerics;

namespace MotoRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SharedController : ControllerBase
    {
        private readonly IAuthenticationServices _authservices;
        private readonly ICategoryMaintenancesServices _categoryMaintenancesServices;
        private readonly ICategoryProductServices _categoryProductServices;
        private readonly IStoreServices _StoreServices;
        private readonly IReviewServices _reviewServices;
        private readonly IMaintanceServices _maintanceServices;
        private readonly IReviewMaintenanceServies _reviewMaintenanceServies;


        public SharedController(IAuthenticationServices authservices,
            ICategoryMaintenancesServices categoryMaintenancesServices,
            ICategoryProductServices subCategoryServices, 
            IStoreServices storeServices, 
            IReviewServices reviewServices, 
            IReviewMaintenanceServies reviewMaintenanceServies,
            IMaintanceServices maintanceServices)
        {
            _authservices = authservices;
            _categoryMaintenancesServices = categoryMaintenancesServices;
            _categoryProductServices = subCategoryServices;
            _StoreServices = storeServices;
            _reviewServices = reviewServices;
            _maintanceServices = maintanceServices;
            _reviewMaintenanceServies= reviewMaintenanceServies;
        }
     
        #region Authntication
        [HttpPost("RegisterCustomer")]
        public async Task<IActionResult> RegisterCustomer([FromBody] AddCustomerDto dto)
        {
            var response = await _authservices.RegisterCustomer(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);

        }
        [HttpPost("RegisterOwnerShop")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> RegisterOwnerShop([FromForm] AddOwnerShopDto dto)
        {
            var response = await _authservices.RegisterOwnerShop(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPost("RegisterMaintenance")]
        [Consumes("multipart/form-data")]

        public async Task<IActionResult> RegisterMaintenance([FromForm] AddMaintenanceDto dto)
        {
            var response = await _authservices.RegisterMaintenance(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpPut("Login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var response = await _authservices.Login(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);

        }
        [HttpPut("LoginGoverment")]
        public async Task<IActionResult> LoginGoverment(LoginDto dto)
        {
            var response = await _authservices.LoginGoverment(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);

        }
        [HttpPut("Logout")]
        public async Task<IActionResult> Logout(int id)
        {
            var response = await _authservices.Logout(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);

        }
        [HttpPut("ResetPassword")]
        public async Task<IActionResult> ResetPassword(string email, string pass)
        {
            var response = await _authservices.ResetPassword(email, pass);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);

        }
        #endregion
        #region Category
        [HttpGet("GetAllCategoryProduct")]
        public async Task<IActionResult> GetAllCategoryProduct()
        {
            var response = await _categoryProductServices.GetAllCategoryProduct();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllCategoryMaintenances")]
        public async Task<IActionResult> GetAllCategoryMaintenances()
        {
            var response = await _categoryMaintenancesServices.GetAllCategoryMaintenances();
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);

        }
    
        [HttpGet("GetCategory/{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var response = await _categoryMaintenancesServices.GetCategoryMaintenances(id);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpGet("GetAllCategoryProductByShop/${id}")]
        public async Task<IActionResult> GetAllCategoryProductByShop(int id)
        {
            var response = await _categoryProductServices.GetAllCategoryProductByStore(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
      
        #endregion

        #region store
        [HttpGet("GetAllShop")]
        public async Task<IActionResult> GetAllShop()
        {
            var response = await _StoreServices.GetAllStore();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("TopProductSalyes/{id}")]
        public async Task<IActionResult> TopProductSalyes(int id)
        {
            var response = await _StoreServices.TopProductSalyes(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        #endregion
        #region Review
        [HttpGet("GetAllReviewForThisProd/{productId}")]
        public async Task<IActionResult> GetAllReviewForThisProd(int productId)
        {

            var response = await _reviewServices.GetAllReviewForThisProd(productId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllReviewForThisMoto/{productId}")]
        public async Task<IActionResult> GetAllReviewForThisMoto(int productId)
        {

            var response = await _reviewServices.GetAllReviewForThisMoto(productId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetReviewByShop/${shopId}")]
        public async Task<IActionResult> GetReviewByShop(int shopId, int motorcycleId, int productId)
        {

            var response = await _reviewServices.GetReviewByShop(shopId, motorcycleId, productId);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
     
        [HttpGet("GetDeleteReview")]
        public async Task<IActionResult> GetDeleteReview(GetDeleteStoreDto dto)
        {

            var response = await _reviewServices.GetDeleteReview(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        [HttpGet("GetReviewMaintenance/${id}")]
        public async Task<IActionResult> GetReviewMaintenance(int id)
        {

            var response = await _reviewMaintenanceServies.GetReviewMaintenance(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }

        [HttpGet("GetDeleteReviewMaintenance")]
        public async Task<IActionResult> GetDeleteReviewMaintenance(GetDeleteReviewMaintenanceDto dto)
        {

            var response = await _reviewMaintenanceServies.GetDeleteReviewMaintenance(dto);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
        #region Maintenance
        [HttpGet("GetAllMaintance")]
        public async Task<IActionResult> GetAllMaintance()
        {
            var response = await _maintanceServices.GetAllMaintance();
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("GetAllMaintanceByCategory/{id}")]
        public async Task<IActionResult> GetAllMaintanceByCategory(int id)
        {
            var response = await _maintanceServices.GetAllMaintanceByCategory(id);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        [HttpGet("SearchMaintenance")]
        public async Task<IActionResult> SearchMaintenance(string? name)
        {
            var response = await _maintanceServices.SearchMaintenance(name);
            if (response.Success) { return Ok(response); }
            return BadRequest(response);
        }
        #endregion
    }

}