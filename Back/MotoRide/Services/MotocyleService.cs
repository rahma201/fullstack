using Azure;
using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;

namespace MotoRide.Services
{
    public class MotocyleService : IMotocyleService
    {
        private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _response;
        private readonly ImageServices _imageServices;
        public MotocyleService(MotoRideDbContext context, ServiceResponse response, ImageServices imageServices)
        {
            _context = context;
            _response = response;
            _imageServices = imageServices;
        }
        public async Task<ServiceResponse> GetAllUsedMotorcycle(int storeId)
        {
            try
            {
                var motorcycle = from p in await _context.Motorcycles
                                          .Where(x => x.IsActive != false && x.Condition == "Used" && x.StoreId == storeId)
                                          .ToListAsync()
                                 select new CardMotorcycleDto
                                 {
                                     MotorcycleId = p.MotorcycleId,
                                     Name = p.Name,
                                     Images = $"http://localhost:5147{p.Images}",
                                     Price = p.Price,
                                     StoreId = p.StoreId
                                 };

                _response.Data = motorcycle;
                _response.Success = true;

            }

            catch (Exception e)
            {
                _response.Message = "can not get all motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> GetAllMotorcycle(int storeId)
        {
            try
            {
                var motorcycle = from p in await _context.Motorcycles
                                          .Where(x => x.IsActive != false && x.StoreId == storeId)
                                          .ToListAsync()
                                 select new CardMotorcycleDto
                                 {
                                     MotorcycleId = p.MotorcycleId,
                                     Name = p.Name,
                                     Images = $"http://localhost:5147{p.Images}",
                                     Price = p.Price,
                                     StoreId = p.StoreId
                                 };

                _response.Data = motorcycle;
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = "can not get all motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> GetAllMotorcycle()
        {
            try
            {
                var motorcycle = from p in await _context.Motorcycles
                                          .Where(x => x.IsActive != false)
                                          .ToListAsync()
                                 select new CardMotorcycleDto
                                 {
                                     MotorcycleId = p.MotorcycleId,
                                     Name = p.Name,
                                     Images = $"http://localhost:5147{p.Images}",
                                     Price = p.Price,
                                     StoreId = p.StoreId
                                 };

                _response.Data = motorcycle;
                _response.Success = true;

            }

            catch (Exception e)
            {
                _response.Message = "can not get all motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> GetAllNewMotorcycle(int storeId)
        {
            try
            {
                var motorcycle = from p in await _context.Motorcycles
                                          .Where(x => x.IsActive != false && x.Condition == "New" && x.StoreId == storeId)
                                          .ToListAsync()
                                 select new CardMotorcycleDto
                                 {
                                     MotorcycleId = p.MotorcycleId,
                                     Name = p.Name,
                                     Images = $"http://localhost:5147{p.Images}",
                                     Price = p.Price,
                                     StoreId = p.StoreId,

                                 };

                _response.Data = motorcycle;
                _response.Success = true;

            }

            catch (Exception e)
            {
                _response.Message = "can not get all motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> GetMotorcycle(int motorcycleId)
        {
            try
            {
                var motorcycle = await _context.Motorcycles.FirstOrDefaultAsync(x => x.MotorcycleId == motorcycleId);
                if (motorcycle == null)
                {
                    _response.Message = $"can not get this {motorcycleId} motorcycle";
                    _response.Success = false;
                }
                var motorcycleJson = new
                {
                    Colors = motorcycle.Colors,
                    MotorcycleId = motorcycle.MotorcycleId,
                    Name = motorcycle.Name,
                    Description = motorcycle.Description,
                    Brand = motorcycle.Brand,
                    Images = $"http://localhost:5147{motorcycle.Images}",
                    Price = motorcycle.Price,
                    ShopOwnerId = motorcycle.StoreId,
                    Mileage = motorcycle.Mileage,
                    Quantity = motorcycle.StockQuantity,
                    Condition = motorcycle.Condition,
                    Year = motorcycle.Year,
                    EngineType = motorcycle.EngineType,
                    motorcycle.StockQuantity,

                };

                _response.Data = motorcycleJson;
                _response.Success = true;
                return _response;

            }
            catch (Exception e)
            {
                _response.Message = $"can not get this {motorcycleId} motorcycle" + e.Message;
                _response.Success = false;
                return _response;
            }

        }
        public async Task<ServiceResponse> GetMotorcycleByShop(int shopId)
        {
            try
            {
                var motorcycle = from p in await _context.Motorcycles
                                           .Where(x => x.StoreId == shopId && x.IsActive != false)
                                           .ToListAsync()
                                 select new CardMotorcycleDto
                                 {
                                     MotorcycleId = p.MotorcycleId,
                                     Name = p.Name,
                                     Images = $"http://localhost:5147{p.Images}",
                                     Price = p.Price,
                                     Quantity = p.StockQuantity,
                                     StoreId = p.StoreId,
                                     RemainingQuantity = p.RemainingQuantity,
                                 };
                if (motorcycle == null)
                {
                    _response.Message = $"can not get  motorcycles in  this {shopId} shop ";
                    _response.Success = false;
                }
                _response.Data = motorcycle;
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = $"can not get  motorcycles in  this {shopId} shop " + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> AddMotorcycle(AddMotorcycleDto dto, IFormFile? images)
        {
            try
            {
                string? productImagePath = null;

                // Check if a product image file is provided
                if (images != null)
                {
                    // Save the image and get its path
                    productImagePath = await _imageServices.Imges(images);
                }

                Motorcycle m = new Motorcycle()
                {
                    Price = dto.Price,
                    StockQuantity = dto.StockQuantity,
                    Colors = dto.Colors,
                    Name = dto.Name,
                    Images = productImagePath,
                    Mileage = dto.Mileage,
                    EngineType = dto.EngineType,
                    Year = dto.Year,
                    Brand = dto.Brand,
                    StoreId = dto.StoreId,
                    Condition = dto.Condition,
                    RemainingQuantity = dto.StockQuantity,
                    Description = dto.Description,
                    CreatedAt = DateTime.Now,
                };
                await _context.Motorcycles.AddAsync(m);
                await _context.SaveChangesAsync();
                _response.Message = "done to add new Motorcycle";
                _response.Success = true;
            }
            catch (Exception e)
            {
                _response.Message = $"can not add new Motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> UpdateMotorcycle(UpdateMotorcycleDto dto, IFormFile? images)
        {
            try
            {
                string? productImagePath = null;

                // Check if a product image file is provided
                if (images != null)
                {
                    // Save the image and get its path
                    productImagePath = await _imageServices.Imges(images);
                }

                var Motorcycle = await _context.Motorcycles.FirstOrDefaultAsync(x => x.MotorcycleId == dto.MotorcycleId);
                if (Motorcycle == null)
                {
                    _response.Message = $"can not get this {dto.MotorcycleId} Motorcycles";
                    _response.Success = false;
                }
                else
                {
                    Motorcycle.Price = dto.Price;
                    Motorcycle.StockQuantity = dto.StockQuantity;
                    Motorcycle.RemainingQuantity = dto.StockQuantity;
                    Motorcycle.Colors = dto.Colors;
                    Motorcycle.Name = dto.Name;
                    if (images != null)
                        Motorcycle.Images = productImagePath;
                    Motorcycle.Mileage = dto.Mileage;
                    Motorcycle.EngineType = dto.EngineType;
                    Motorcycle.Year = dto.Year;
                    Motorcycle.Brand = dto.Brand;
                    Motorcycle.StoreId = dto.StoreId;
                    Motorcycle.Condition = dto.Condition;
                    Motorcycle.Description = dto.Description;

                    _context.Update(Motorcycle);
                    await _context.SaveChangesAsync();
                    _response.Message = $"done to update this {dto.MotorcycleId} Motorcycle";
                    _response.Success = true;
                }
            }
            catch (Exception e)
            {
                _response.Message = $"can not update this {dto.MotorcycleId} Motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> DeleteMotorcycle(int motorcycleId)
        {
            try
            {
                var motorcycle = await _context.Motorcycles.FirstOrDefaultAsync(x => x.MotorcycleId == motorcycleId);
                if (motorcycle == null)
                {
                    _response.Message = $"can not delete this {motorcycleId} motorcycle";
                    _response.Success = false;
                }

                motorcycle.IsActive = false;
                _context.Update(motorcycle);
                await _context.SaveChangesAsync();
                _response.Success = true;
                _response.Message = $" done to delete this {motorcycleId} motorcycle ";
            }
            catch (Exception e)
            {
                _response.Message = $"can not delete this {motorcycleId} motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }

        public async Task<ServiceResponse> SearchMotorcycle(string name)
        {
            {
                try
                {
                    var product = from p in await _context.Motorcycles
                                  .Where(x => x.IsActive != false &&
                                  (x.Name.ToLower().Contains(name.ToLower()) ||
                                   x.Description.ToLower().Contains(name.ToLower()) ||
                                   x.Brand.ToLower().Contains(name.ToLower()) ||
                                   x.EngineType.ToLower().Contains(name.ToLower())
                                  ))
                                  .ToListAsync()
                                  select new CardMotorcycleDto
                                  {
                                      MotorcycleId = p.MotorcycleId,
                                      Name = p.Name,
                                      Images = $"http://localhost:5147{p.Images}",
                                      Price = p.Price,
                                  };
                    if (product == null)
                    {
                        _response.Message = "can not get any Motorcycles";
                        _response.Success = false;
                    }
                    _response.Data = product;
                    _response.Success = true;

                }
                catch (Exception e)
                {
                    _response.Message = "can not get all Motorcycle" + e.Message;
                    _response.Success = false;
                }
                return _response;
            }
        }
        public async Task<ServiceResponse> MostPopularityMotorcycle()
        {
            try
            {
                var response = new ServiceResponse();

                var product = await _context.OrderItems.Include(x => x.Motorcycle).
                    GroupBy(x => x.MotorcycleId)
                    .Select(x => new {
                        x.First().MotorcycleId,
                        x.First().Motorcycle.Name,
                        x.First().Image,
                        OrderCount = x.Count()
                    }).ToListAsync();



                if (product == null)
                {
                    _response.Message = "can not get any Motorcycles";
                    _response.Success = false;
                }
                _response.Data = product.OrderByDescending(x => x.OrderCount).FirstOrDefault();
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = "can not get all Motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }

        public async Task<ServiceResponse> FilteringMotorcycle(int shopId, string? sortBy, string? color, decimal? startPrice, decimal? endPrice, decimal? mileage, int? year)
        {

            var response = new ServiceResponse();

            try
            {

                var query = _context.Motorcycles.Where(m => m.StoreId == shopId && m.IsActive != false);
                query.Where(m => m.Colors.Contains(color) ||
                     (!startPrice.HasValue || m.Price >= startPrice.Value) ||
                     (!endPrice.HasValue || m.Price <= endPrice.Value) ||
                     (!mileage.HasValue || m.Mileage <= mileage.Value) ||
                     (!year.HasValue || m.Year == year.Value)
                 );

                if (!string.IsNullOrEmpty(sortBy))
                {

                    sortBy.ToLower();



                    if (sortBy == "price_desc")
                        query = query.OrderByDescending(m => m.Price);
                    else if (sortBy == "price_all")
                        query = query;
                    else if (sortBy == "price_asc")
                        query = query.OrderBy(m => m.Price);
                    else
                    {
                        if (sortBy == "default") query = query;
                        else if (sortBy == "newness") query = query.OrderByDescending(m => m.CreatedAt);
                        else if (sortBy == "popularity")
                        {

                            var query2 = _context.OrderItems.Include(x => x.Motorcycle).
                            GroupBy(x => x.MotorcycleId)
                            .Select(x => new
                            {
                                x.First().MotorcycleId,
                                x.First().Motorcycle.Name,
                                x.First().Image,
                                OrderCount = x.Count()
                            }).ToList().OrderByDescending(x => x.OrderCount);

                            response.Data = query2;
                        }
                        var result = await query.ToListAsync();

                        response.Success = true;
                        response.Data = result;
                    }
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse> MostPopularityMotorcyclByShop(int shop)
        {
            try {
                var response = new ServiceResponse();

                var product = await _context.OrderItems.Where(x => x.StoreId == shop).Include(x => x.Motorcycle).
                    GroupBy(x => x.MotorcycleId)
                    .Select(x => new {
                        x.First().MotorcycleId,
                        x.First().Motorcycle.Name,
                        x.First().Image,
                        OrderCount = x.Count()
                    }).ToListAsync();



                if (product == null)
                {
                    _response.Message = "can not get any Motorcycles";
                    _response.Success = false;
                }
                _response.Data = product.OrderByDescending(x => x.OrderCount).FirstOrDefault();
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = "can not get all Motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }


        public async Task<ServiceResponse> MonthMotorcycleSalyes(int shop)
        {
            try
            {
                var response = new ServiceResponse();

                var product = await _context.OrderItems.Where(x => x.StoreId == shop && x.CreatedAt.Month == DateTime.UtcNow.Month).Include(x => x.Motorcycle).
                    GroupBy(x => x.MotorcycleId)
                    .Select(x => new {
                        x.First().MotorcycleId,
                        x.First().Motorcycle.Name,
                        x.First().Image,
                        OrderCount = x.Count()

                    }).ToListAsync();



                if (product == null)
                {
                    _response.Message = "can not get any Motorcycles";
                    _response.Success = false;
                }
                _response.Data = product.OrderByDescending(x => x.OrderCount).FirstOrDefault();
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = "can not get all Motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> YearMotorcycleSalyes(int shop)
        {
            try
            {
                var response = new ServiceResponse();

                var product = await _context.OrderItems.Where(x => x.StoreId == shop && x.CreatedAt.Year == DateTime.UtcNow.Year).Include(x => x.Motorcycle).
                    GroupBy(x => x.MotorcycleId)
                    .Select(x => new {
                        x.First().MotorcycleId,
                        x.First().Motorcycle.Name,
                        x.First().Image,
                        OrderCount = x.Count()

                    }).ToListAsync();



                if (product == null)
                {
                    _response.Message = "can not get any Motorcycles";
                    _response.Success = false;
                }
                _response.Data = product.OrderByDescending(x => x.OrderCount).FirstOrDefault();
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = "can not get all Motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }

        public async Task<ServiceResponse> countSalesByShopId(int shopId)
        {
            
                var response = new ServiceResponse();
                try
                {
                    var today = DateTime.UtcNow.Date;
                    var month = today.Month;
                    var year = today.Year;

                    var allOrders = _context.OrderItems
                        .Where(x => x.StoreId == shopId)
                        .Select(x => x.CreatedAt);

                    int todaySales = await allOrders.CountAsync(x => x.Date == today);
                    int monthSales = await allOrders.CountAsync(x => x.Month == month && x.Year == year);
                    int yearSales = await allOrders.CountAsync(x => x.Year == year);

                    response.Data = new
                    {
                        Today = todaySales,
                        Month = monthSales,
                        Year = yearSales
                    };
                    response.Success = true;
                }
                catch (Exception ex)
                {
                    response.Message = "Error retrieving stats: " + ex.Message;
                    response.Success = false;
                }

                return response;
            

        }


        public async Task<ServiceResponse> TopMostPopularityMotorcycle()
        {
            try
            {
                var response = new ServiceResponse();

                // Group orders by MotorcycleId and count them, selecting relevant data
                var product = await _context.OrderItems.
                    Where(x => x.Motorcycle.IsActive != false&&x.MotorcycleId!=null)
                    .Include(x => x.Motorcycle) // Ensure Motorcycle is included
                    .GroupBy(x => x.MotorcycleId) // Group by MotorcycleId
                    .Select(x => new
                    {
                        MotorcycleId = x.Key,
                        Name = x.FirstOrDefault().Motorcycle.Name,
                        Image = $"http://localhost:5147{x.FirstOrDefault().Motorcycle.Images}",

                        x.FirstOrDefault().Motorcycle.Price,
                        OrderCount = x.Count() // Count the number of orders for each motorcycle
                    })
                    .OrderByDescending(x => x.OrderCount) // Order by OrderCount descending
                    .Take(20) // Take the top 10 motorcycles
                    .ToListAsync();

                if (product == null || !product.Any()) // Check if no motorcycles were found
                {
                    response.Message = "Cannot get any Motorcycles";
                    response.Success = false;
                    return response;

                }
                else
                {
                    response.Data = product;
                    response.Success = true;

                    return response;

                }
            }
            catch (Exception e)
            {
                _response.Message = "Cannot get all Motorcycles: " + e.Message;
                _response.Success = false;
                return _response;

            }
        }

    }
}