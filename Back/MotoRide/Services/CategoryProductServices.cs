using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;
using static MotoRide.Services.CategoryProductServices;

namespace MotoRide.Services
{
    public class CategoryProductServices: ICategoryProductServices
        {
            private readonly MotoRideDbContext _context;
            private readonly ServiceResponse _response;
            public CategoryProductServices(MotoRideDbContext context, ServiceResponse response)
            {
                _context = context;
                _response = response;
            }
            public async Task<ServiceResponse> GetAllCategoryProduct()
            {
                try
                {
                    var CategoryProduct = from c in await _context.CategoryProducts
                                      .Where(x=>x.IsActive!=false).ToListAsync()
                                      select new
                                      {
                                          Name=c.Name,
                                          CategoryProductId= c.CategoryProductId,
                                          CreatedAt=c.CreatedAt
                                      };
                if (CategoryProduct == null )
                {
                    _response.Message = "Cannot get CategoryProducts. No data found.";
                    _response.Success = false;
                }
                else
                {
                    _response.Data = CategoryProduct;
                    _response.Success = true;
                    _response.Message = "Successfully retrieved CategoryProducts.";
                }
            
            }
                catch (Exception e)
                {
                    _response.Message = $"can not get  Sub Category" + e.Message;
                    _response.Success = false;
                }
                return _response;
            }

        public async Task<ServiceResponse> GetAllCategoryProductByStore(int id)
        {
            try
            {
                var CategoryProduct = await _context.CategoryProducts.Where(x =>x.StoreId == id&& x.IsActive != false).ToListAsync();
                if (CategoryProduct == null)
                {
                    _response.Message = $"can not get CategoryProduct";
                    _response.Success = false;
                }
                _response.Data = CategoryProduct;
                _response.Success = true;
                _response.Message = $"done to get CategoryProduct";

            }
            catch (Exception e)
            {
                _response.Message = $"can not get  Sub Category" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> GetCategoryProduct(int CategoryProductId)
            {
                try
                {
                    var CategoryProduct = await _context.CategoryProducts.FirstOrDefaultAsync(x => x.CategoryProductId == CategoryProductId);
                    if (CategoryProduct == null)
                    {
                        _response.Message = $"can not get this {CategoryProductId} CategoryProduct";
                        _response.Success = false;
                    }
                    _response.Data = CategoryProduct;
                    _response.Success = true;

                }
                catch (Exception e)
                {
                    _response.Message = $"can not get this {CategoryProductId} CategoryProduct" + e.Message;
                    _response.Success = false;
                }
                return _response;
            }
            public async Task<ServiceResponse> AddCategoryProduct(CategoryProductDto dto)
            {
                try
                {
                CategoryProduct c = new CategoryProduct
                {
                    Name = dto.Name,
                    StoreId = dto.StoreId,
                    CreatedAt = DateTime.Now,

                    };

                    await _context.CategoryProducts.AddAsync(c);
                    await _context.SaveChangesAsync();
                    _response.Message = "done to add new Sub Category";
                    _response.Success = true;
                }
                catch (Exception e)
                {
                    _response.Message = $"can not add new Sub Category" + e.Message;
                    _response.Success = false;
                }
                return _response;
            }
            public async Task<ServiceResponse> UpdateCategoryProduct(UpdateCategoryProductDto dto)
            {
                try
                {
                    var Category = await _context.CategoryProducts.FirstOrDefaultAsync(x => x.CategoryProductId == dto.CategoryProductId);
                if (Category == null)
                {
                    _response.Message = $"can not get this {dto.CategoryProductId} CategoryProduct";
                    _response.Success = false;
                }
                else
                {
                    Category.Name = dto.Name;
                    dto.StoreId = dto.StoreId;
                    _context.Update(Category);
                    await _context.SaveChangesAsync();
                    _response.Message = $"done to update this {dto.CategoryProductId} CategoryProduct";
                    _response.Success = true;
                }
                }
                catch (Exception e)
                {
                    _response.Message = $"can not update this {dto.CategoryProductId} CategoryProduct" + e.Message;
                    _response.Success = false;
                }
                return _response;
            }
            public async Task<ServiceResponse> DeleteCategoryProduct(int CategoryProductId)
            {
                try
                {
                    var Categories = await _context.CategoryProducts.FirstOrDefaultAsync(x => x.CategoryProductId == CategoryProductId);
                    if (Categories != null)
                    {
                        Categories.IsActive = false;
                        _context.CategoryProducts.Update(Categories);
                        await _context.SaveChangesAsync();
                        _response.Success = true;
                    }
                else { 
                    _response.Message = $"can not delete this {CategoryProductId} CategoryProduct";
                    _response.Success = false;
                }}
                catch (Exception e)
                {
                    _response.Message = $"can not delete this {CategoryProductId} CategoryProduct" + e.Message;
                    _response.Success = false;
                }
                return _response;
            }
        }
    } 
