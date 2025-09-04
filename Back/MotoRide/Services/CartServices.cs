using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;

namespace MotoRide.Services
{
    public class CartServices : ICartServices
    {
        private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _response;
        public CartServices(MotoRideDbContext context, ServiceResponse response)
        {
            _context = context;
            _response = response;
        }

        public Task<ServiceResponse> GetAllCart()
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse> GetCart(int cartId)
        {
            try
            {
                var cart = await _context.Carts.FirstOrDefaultAsync(x => x.CartId == cartId);
                if (cart == null)
                {
                    _response.Message = $"can not get this {cartId} cart";
                    _response.Success = false;
                }
                _response.Data = cart;
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get this {cartId} cart" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> GetCartByCustomerId(int cutomerId)
        {
            try
            {
                var cart = await _context.Carts.FirstOrDefaultAsync(x => x.CustomerId== cutomerId&&x.IsActive!=false);
                if (cart == null)
                {
                    _response.Message = $"can not get  cart to this customer {cutomerId}";
                    _response.Success = false;
                }
                else {
                _response.Data = cart.CartId;
                _response.Success = true;

            }             
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get  cart to this customer {cutomerId}" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> AddCart(AddCartDto dto)
        {
            try
            {
                if (dto.CustomerId != null) { 
                Cart cart = new Cart
                {
                    CustomerId = dto.CustomerId,
                    CreatedAt = DateTime.UtcNow,

                };

                await _context.Carts.AddAsync(cart);
                await _context.SaveChangesAsync();
                _response.Message = "done to add new cart";
                _response.Success = true;
                _response.Data = cart.CartId;
            }
                else
                {
                    _response.Message = $"can not add new cart you should login";
                    _response.Success = false;
                    int CartId=0;
                    _response.Data = CartId;
                    return _response;
                }
            }
            catch (Exception e)
            {
                _response.Message = $"can not add new cart" + e.Message;
                _response.Success = false;
                return _response;
            }
            return _response;

        }
        public async Task<ServiceResponse> DeleteCart(int cartId)
        {
            try
            {
                var cart = await _context.Carts.FirstOrDefaultAsync(x => x.CartId == cartId);
                if (cart == null)
                {
                    _response.Message = $"can not get this {cartId} cart";
                    _response.Success = false;
                }
                cart.IsActive = true;
                _context.Carts.Update(cart);
                await _context.SaveChangesAsync();
                _response.Message = "done to delete cart";
                _response.Success = true;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get this {cartId} cart" + e.Message;
                _response.Success = false;
                return _response;
            }
            return _response;

        }
        public async Task<ServiceResponse> UpdateCart(UpdateCartDto dto)
        {
            try
            {
                var cart = await _context.Carts.FirstOrDefaultAsync(x => x.CartId == dto.CartId);
                if (cart == null)
                {
                    _response.Message = $"can not get this {dto.CartId} cart";
                    _response.Success = false;
                }
              cart.CustomerId = dto.CustomerId;
                _context.Carts.Update(cart);
                await _context.SaveChangesAsync();
                _response.Message = "done to delete cart";
                _response.Success = true;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get this {dto.CartId} cart" + e.Message;
                _response.Success = false;
            }
            return _response;

        }
    }
}
