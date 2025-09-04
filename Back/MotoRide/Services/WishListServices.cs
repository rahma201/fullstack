using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;

namespace MotoRide.Services
{
    public class WishListServices : IWishListServices
    {
        private readonly MotoRideDbContext _context;

        public WishListServices(MotoRideDbContext context)
        {
            _context = context;
        }

        // 1. Create a new WishList
        public async Task<ServiceResponse> AddWishList(AddWishListDto dto)
        {
            var wishListIfExist = _context.WishLists
        .Any(x => x.CustomerId == dto.CustomerId &&
                  (x.MotorcycleId == dto.MotorcycleId));
            if (dto.ProductId != null)
            {
     wishListIfExist = _context.WishLists
    .Any(x => x.CustomerId == dto.CustomerId &&
              ( x.ProductId == dto.ProductId));
            }
        


               
            // If the item is not already in the wish list, add it
            if (!wishListIfExist)
            {
                var wishList = new WishList
                {
                    CustomerId = dto.CustomerId,
                    MotorcycleId = dto.MotorcycleId,
                    ProductId = dto.ProductId,
                    CreatedAt = DateTime.UtcNow
                };

                // Add to the context and save changes
                _context.WishLists.Add(wishList);
                await _context.SaveChangesAsync();

                return new ServiceResponse { Success = true, Message = "WishList created successfully." };
            }
            else
            {
                // If the wish list already contains the item, return a different message
                return new ServiceResponse { Success = false, Message = "Item already in the wish list." };
            }
        }


        // 2. Get a specific WishList by ID
        public async Task<ServiceResponse> GetWishList(int customerId)
        {
            var wishList = await _context.WishLists.Where(w => w.CustomerId == customerId&&w.IsActive!=false)
                .Include(i => i.Product)
                .Include(w => w.Motorcycle).OrderByDescending(x=>x.CreatedAt)
                .ToListAsync();

            if (wishList == null)
                return new ServiceResponse { Success = false, Message = "WishList not found." };

            return new ServiceResponse { Success = true, Data = wishList };
        }

    
     
    
        public async Task<ServiceResponse> DeleteWishList(int wishListId)
        {
            var wishList = await _context.WishLists.FindAsync(wishListId);
            if (wishList == null)
                return new ServiceResponse { Success = false, Message = "WishList not found." };
            wishList.IsActive = false;
            _context.WishLists.Update(wishList);
            await _context.SaveChangesAsync();

            return new ServiceResponse { Success = true, Message = "WishList deleted." };
        }
    }
}
    