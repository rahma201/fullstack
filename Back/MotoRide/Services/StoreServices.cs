using Azure;
using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;
using System.Globalization;

namespace MotoRide.Services
{
    public class StoreServices : IStoreServices
    {
        private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _respon;


        public StoreServices(MotoRideDbContext context, ServiceResponse response)
        {
            _context = context;
            _respon = response;

        }
        public async Task<ServiceResponse> GetAllStore()
        {
            try
            {
                var shops = await _context.Stores
    .Where(x => x.IsActive != false&&x.IsCanLogin==true)
    .Select(i => new
    {
        i.StoreId,
        i.StoreName,

    })
    .ToListAsync();
                if (shops != null)
                {
                    _respon.Data = shops;
                    _respon.Success = true;
                }
                else
                {
                    _respon.Message = "can not get any shop";
                    _respon.Success = false;
                }
                return _respon;
            }
            catch (Exception ex)
            {
                _respon.Message = ex.Message;
                _respon.Success = false;
                return _respon;
            }

        }
        public async Task<ServiceResponse> GetAllStoreAccept()
        {
            try
            {
                var shops = await _context.Stores.Where(x => x.IsActive != false && x.IsCanLogin == true).ToListAsync();

                if (shops != null)
                {
                    _respon.Data = shops;
                    _respon.Success = true;
                }
                else
                {
                    _respon.Message = "can not get any shop";
                    _respon.Success = false;
                }
                return _respon;
            }
            catch (Exception ex)
            {
                _respon.Message = ex.Message;
                _respon.Success = false;
                return _respon;
            }

        }
        public async Task<ServiceResponse> GetAllStoreReject()
        {
            try
            {
                var shops = await _context.Stores.Where(x => x.IsActive != false && x.IsCanLogin == false).ToListAsync()
                          ;
                if (shops != null)
                {
                    _respon.Data = shops;
                    _respon.Success = true;
                }
                else
                {
                    _respon.Message = "can not get any shop";
                    _respon.Success = false;
                }
                return _respon;
            }
            catch (Exception ex)
            {
                _respon.Message = ex.Message;
                _respon.Success = false;
                return _respon;
            }

        }
        public async Task<ServiceResponse> GetAllStoreNotResponse()
        {
            try
            {
                var shops = await _context.Stores.Where(x => x.IsActive != false && x.IsCanLogin == null).ToListAsync()
                           ;
                if (shops != null)
                {
                    _respon.Data = shops;
                    _respon.Success = true;
                }
                else
                {
                    _respon.Message = "can not get any shop";
                    _respon.Success = false;
                }
                return _respon;
            }
            catch (Exception ex)
            {
                _respon.Message = ex.Message;
                _respon.Success = false;
                return _respon;
            }

        }
        public async Task<ServiceResponse> AllowStoreToLogin(AllowLoginDto dto)
        {
            try
            {
                var store = await _context.Stores.FirstOrDefaultAsync(x => x.StoreId == dto.Id);
                if (store == null)
                {
                    _respon.Success = false;
                    _respon.Message = "can not allow login for this store";
                }
                else
                {
                    store.IsCanLogin = dto.IsCanLogin;
                    _context.Stores.Update(store);
                    await _context.SaveChangesAsync();
                    _respon.Success = true;
                    _respon.Message = "done to allow login for this store";
                }
                return _respon;
            }
            catch (Exception ex)
            {
                _respon.Success = false;
                _respon.Message = "can not allow login for this store" + ex.Message;
                return _respon;
            }
        }

        public async Task<ServiceResponse> GetYearlySalesAsync(int shopId)
        {
            try
            {
                var result = await _context.OrderItems
                    .Where(o => o.StoreId == shopId && o.CreatedAt.Year == DateTime.UtcNow.Year)
                    .GroupBy(o => o.CreatedAt.Month)
                    .Select(g => new
                    {
                        Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
                        Sales = g.Count()
                    })
                    .ToListAsync();
                _respon.Success = true;
                _respon.Data = result;
                return _respon;

            }
            catch (Exception ex)
            {
                _respon.Success = false;
                _respon.Message = "can not allow login for this store" + ex.Message;
                return _respon;
            }
        }

        public async Task<ServiceResponse> TopMotorcycleSalyes(int shop)
        {
            {
                try
                {
                    var response = new ServiceResponse();

                    var product = await _context.OrderItems.Where(x => x.StoreId == shop && x.CreatedAt.Year == DateTime.UtcNow.Year).Include(x => x.Motorcycle).
                        GroupBy(x => x.MotorcycleId)
                        .Select(x => new
                        {
                            x.First().MotorcycleId,
                            x.First().Motorcycle.Name,
                            x.First().Image,
                            OrderCount = x.Count()

                        }).ToListAsync();



                    if (product.Any(c => c.MotorcycleId != null))
                    {
                        _respon.Data = product.OrderByDescending(x => x.OrderCount).FirstOrDefault();
                        _respon.Success = true;
                    }
                    else
                    {
                        _respon.Message = "can not get any Product";
                        _respon.Success = false;
                    }

                }
                catch (Exception e)
                {
                    _respon.Message = "can not get all Motorcycle" + e.Message;
                    _respon.Success = false;
                }
                return _respon;
            }
        }

        public async Task<ServiceResponse> TopProductSalyes(int shop)
        {
            {
                try
                {
                    var response = new ServiceResponse();

                    var product = await _context.OrderItems.Where(x => x.StoreId == shop && x.CreatedAt.Year == DateTime.UtcNow.Year).Include(x => x.Product).
                        GroupBy(x => x.ProductId)
                        .Select(x => new
                        {
                            x.First().ProductId,
                            x.First().Product.Name,
                            x.First().Image,
                            OrderCount = x.Count()

                        }).ToListAsync();

                
                    if (product.Any(c => c.ProductId != null)) { 
                    _respon.Data = product.OrderByDescending(x => x.OrderCount).FirstOrDefault();
                _respon.Success = true;
            }
                else
            {
                _respon.Message = "can not get any Product";
                _respon.Success = false;
            }

                }
                catch (Exception e)
                {
                    _respon.Message = "can not get all ProductId" + e.Message;
                    _respon.Success = false;
                }
                return _respon;
            }
        }
        public async Task<ServiceResponse> Salyes(int shop)
        {
            {
                try
                {
                    var response = new ServiceResponse();

                    var product = _context.OrderItems.Where(x => x.StoreId == shop).Count();



                    if (product == null)
                    {
                        _respon.Message = "can not get any Product";
                        _respon.Success = false;
                    }
                    _respon.Data = product;
                    _respon.Success = true;

                }
                catch (Exception e)
                {
                    _respon.Message = "can not get all ProductId" + e.Message;
                    _respon.Success = false;
                }
                return _respon;
            }
        }

        public async Task<ServiceResponse> CountMotorcycle(int shop)
        {
            {
                try
                {
                    var response = new ServiceResponse();

                    var product = _context.Motorcycles.Where(x => x.StoreId == shop).Count();



                    if (product == null)
                    {
                        _respon.Message = "can not get any Motorcycles";
                        _respon.Success = false;
                    }
                    _respon.Data = product;
                    _respon.Success = true;

                }
                catch (Exception e)
                {
                    _respon.Message = "can not get all Motorcycle" + e.Message;
                    _respon.Success = false;
                }
                return _respon;
            }
        }

        public async Task<ServiceResponse> CountProduct(int shop)
        {
            {
                try
                {
                    var response = new ServiceResponse();

                    var product = _context.Products.Where(x => x.StoreId == shop).Count();



                    if (product == null)
                    {
                        _respon.Message = "can not get any Motorcycles";
                        _respon.Success = false;
                    }
                    _respon.Data = product;
                    _respon.Success = true;

                }
                catch (Exception e)
                {
                    _respon.Message = "can not get all Motorcycle" + e.Message;
                    _respon.Success = false;
                }
                return _respon;
            }
        }

        public async Task<ServiceResponse> CountProductAndCategory(int shopId)
        {
            var response = new ServiceResponse();

            try
            {
                var productData = await _context.Products
                    .Where(x => x.StoreId == shopId)
                    .Include(x => x.SubCategory)
                    .GroupBy(x => x.SubCategory.Name)
                    .Select(g => new
                    {
                        CategoryName = g.Key,
                        ProductCount = g.Count()
                    })
                    .ToListAsync();

                response.Data = new
                {
                    CategoryCount = productData.Count,

                    Details = productData
                };

                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Message = "Error getting data: " + ex.Message;
                response.Success = false;
            }

            return response;
        }


        public async Task<ServiceResponse> QunityMotorcycle(int shop)
        {
            {
                try
                {
                    var response = new ServiceResponse();

                    var product = _context.Motorcycles.Where(x => x.RemainingQuantity == 0).Count();



                    if (product == null)
                    {
                        _respon.Message = "can not get any Motorcycles";
                        _respon.Success = false;
                    }
                    _respon.Data = product;
                    _respon.Success = true;

                }
                catch (Exception e)
                {
                    _respon.Message = "can not get all Motorcycle" + e.Message;
                    _respon.Success = false;
                }
                return _respon;
            }
        }
        public async Task<ServiceResponse> QunityProduct(int shop)
        {
            {
                try
                {
                    var response = new ServiceResponse();

                    var product = _context.Products.Where(x => x.RemainingQuantity == 0).Count();



                    if (product == null)
                    {
                        _respon.Message = "can not get any Motorcycles";
                        _respon.Success = false;
                    }
                    _respon.Data = product;
                    _respon.Success = true;

                }
                catch (Exception e)
                {
                    _respon.Message = "can not get all Motorcycle" + e.Message;
                    _respon.Success = false;
                }
                return _respon;
            }
        }
 
    }
}