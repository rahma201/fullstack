using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;

namespace MotoRide.Services
{
    public class CartItemServices : ICartItemServices
    {
        private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _response;
        private readonly ICartServices _cart;
        public CartItemServices(MotoRideDbContext context, ServiceResponse response, ICartServices cart)
        {
            _context = context;
            _response = response;
            _cart = cart;
        }

        public async Task<ServiceResponse> GetItemsInCart(int cartId)
        {
            try
            {
                // Query all CartItems for the given CartId where the item is active
                var cartItems = await _context.CartItems
                    .Where(x => x.CartId == cartId && x.IsActive != false)
                    .Select(c => new
                    {
                        CartItemId = c.CartItemId,
                        CartId = c.CartId,
                        ItemId = c.ProductId.HasValue ? c.ProductId : c.MotorcycleId, 
                        Price = c.ProductId.HasValue ? c.Product.Price : c.Motorcycle.Price,
                        Image = c.ProductId.HasValue ?  $"http://localhost:5147{c.Product.Images}" : $"http://localhost:5147{c.Motorcycle.Images}", 
                        Color = c.Color,
                        Size = c.Size,
                        CreatedAt = c.CreatedAt,
                        Quantity=c.Quantity,
                        Name = c.ProductId.HasValue ? c.Product.Name : c.Motorcycle.Name // Conditional Name selection
                    })
                    .ToListAsync();  // Fetch all matching cart items

                if (cartItems == null)
                {
                    _response.Message = $"No active items found in the cart with ID {cartId}.";
                    _response.Success = false;
                }
                else
                {
                    _response.Data = cartItems;
                    _response.Success = true;
                }

                return _response;
            }
            catch (Exception ex)
            {
                _response.Message = $"An error occurred while fetching items for cart {cartId}: {ex.Message}";
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> AddItemInCart(AddCartItemDto dto)
        {
            try
            {
                var cart = await _context.Carts.FirstOrDefaultAsync(x => x.CustomerId == dto.CustomerId && x.IsActive != false);

                if (cart != null)
                {
                    dto.CartId = cart.CartId;
                    await AddCartItem(dto);
                    _response.Message = "done to add new item in cart ";
                    _response.Success = true;
                }
                else
                {
                    AddCartDto cartDto = new AddCartDto
                    {
                        CustomerId = dto.CustomerId,
                    };

                   var data= await _cart.AddCart(cartDto);
                    var cartCreateNow = await _context.Carts.FirstOrDefaultAsync(x => x.CustomerId == dto.CustomerId && x.IsActive != false);
                    dto.CartId = cartCreateNow.CartId;
                    await AddCartItem(dto);
                    _response.Message = "done to add new item in cart ";

                    _response.Success = true;
                }
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = $"can not add new cartItem" + e.Message;
                _response.Success = false;
                return _response;
            }
            return _response;

        }
        private async Task<ServiceResponse> AddCartItem(AddCartItemDto dto)
        {
            try
            { 
                var cartItems = await _context.CartItems.Where(x => x.CartId == dto.CartId &&
                                (x.ProductId == dto.ProductId || x.MotorcycleId == dto.MotorcycleId) &&
                                x.IsActive!=false).ToListAsync();
                var existingCartItem = cartItems.FirstOrDefault(x => x.Color == dto.Color && x.Size == dto.Size);


                if (existingCartItem != null)
                {
                    existingCartItem.Quantity = (existingCartItem.Quantity ?? 0) + (dto.Quantity > 0 ? dto.Quantity : 1);
                    _context.CartItems.Update(existingCartItem);
                    await _context.SaveChangesAsync();
                    _response.Success = true;

                    _response.Message = "Quantity updated successfully.";
                }
                else
                {
                    var newCartItem = new CartItem
                    {
                        CartId = dto.CartId,
                        MotorcycleId = dto.MotorcycleId,
                        Quantity = dto.Quantity > 0 ? dto.Quantity : 1, // ضمان أن تكون الكمية 1 على الأقل
                        CreatedAt = DateTime.Now,
                        Color = dto.Color,
                        Size = dto.Size,
                        ProductId = dto.ProductId,
                    };

                    await _context.CartItems.AddAsync(newCartItem);

                 
                }
                    var products = await _context.Products.Where(x => x.ProductId == dto.ProductId && x.IsActive != false).FirstOrDefaultAsync();
                    var Motorcycle = await _context.Motorcycles.Where(x => x.MotorcycleId == dto.MotorcycleId && x.IsActive != false).FirstOrDefaultAsync();
                    if (products != null)
                    {
                        products.RemainingQuantity -= dto.Quantity;
                        _context.Products.Update(products);
                        await _context.SaveChangesAsync();

                    }
                    if (Motorcycle != null)
                    {
                        Motorcycle.RemainingQuantity -= dto.Quantity;
                        _context.Motorcycles.Update(Motorcycle);
                        await _context.SaveChangesAsync();
                    }

                    await _context.SaveChangesAsync();
                _response.Success = true;
                _response.Message = "New item added due to different size or color.";

             
            }
            catch (Exception e)
            {
                _response.Message = $"Error adding cart item: {e.Message}";
                _response.Success = false;
            }

            return _response;
        }
       

        public async Task<ServiceResponse> DeleteItemInCart(int cartItemId)
        {
            try
            {
                var cartItem = await _context.CartItems.FirstOrDefaultAsync(x => x.CartItemId == cartItemId&&x.IsActive!=false);
                if (cartItem == null)
                {
                    _response.Message = $"can not get this {cartItemId} cartItem";
                    _response.Success = false;
                }
                else
                {
                    cartItem.IsActive = false;
                   
                    _context.CartItems.Update(cartItem); 
                    await _context.SaveChangesAsync();
                    _response.Success = true;
                    _response.Message = "done to delete cart";
                }
               
             
             
            }
            catch (Exception e)
            {
                _response.Message = $"can not get this {cartItemId} cartItem" + e.Message;
                _response.Success = false;
                return _response;
            }
            return _response;

        }
    }
}
