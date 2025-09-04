using Azure;
using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;
using System.Diagnostics.Eventing.Reader;

namespace MotoRide.Services
{
    public class CategoryMaintenancesServices : ICategoryMaintenancesServices
    {
        private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _response;
        public CategoryMaintenancesServices(MotoRideDbContext context, ServiceResponse response)
        {
            _context = context;
            _response = response;
        }
        public async Task<ServiceResponse> GetAllCategoryMaintenances()
        {
            try
            {
                var CategoryMaintenances = await _context.CategoryMaintenances.Where(x=>x.IsActive!= false).ToListAsync();
                if (CategoryMaintenances == null)
                {
                    _response.Message = $"can not get CategoryMaintenances";
                    _response.Success = false;
                }
                _response.Data = CategoryMaintenances;
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = $"can not get  CategoryMaintenances" + e.Message;
                _response.Success = false;
            }
            return _response;
        }

        public  async Task<ServiceResponse> GetCategoryMaintenances(int CategoryMaintenanceId)
        {
            try
            {
                var Category = await _context.CategoryMaintenances.FirstOrDefaultAsync(x => x.CategoryMaintenanceId == CategoryMaintenanceId);
                if (Category == null)
                {
                    _response.Message = $"can not get this {CategoryMaintenanceId} CategoryMaintenance";
                    _response.Success = false;
                }
                _response.Data = Category;
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = $"can not get this {CategoryMaintenanceId} CategoryMaintenance" + e.Message;
                _response.Success = false;
            }
            return _response;
        }

        public async Task<ServiceResponse> AddCategoryMaintenances(string name)
        {
            try
            {
                CategoryMaintenance c = new CategoryMaintenance
                {
                    Name = name,
                    CreatedAt = DateTime.Now,
                   
                };

                await _context.CategoryMaintenances.AddAsync(c);
                await _context.SaveChangesAsync();
                _response.Message = "done to add new Category";
                _response.Success = true;
            }
            catch (Exception e)
            {
                _response.Message = $"can not add new Category" + e.Message;
                _response.Success = false;
            }
            return _response;
        }

        public async Task<ServiceResponse> UpdateCategoryMaintenances(CategoryMaintenanceDto dto) {
            try
            {
                var Category = await _context.CategoryMaintenances.FirstOrDefaultAsync(x => x.CategoryMaintenanceId == dto.CategoryMaintenanceId);
                if (Category == null)
                {
                    _response.Message = $"can not get this {dto.CategoryMaintenanceId} CategoryMaintenance";
                    _response.Success = false;
                }
                else { 
                Category.Name = dto.Name;
                _context.Update(Category);
                await _context.SaveChangesAsync();
                _response.Message = $"done to update this {dto.CategoryMaintenanceId} CategoryMaintenance";
                _response.Success = true;
                    }
            }
            catch (Exception e)
            {
                _response.Message = $"can not update this {dto.CategoryMaintenanceId} CategoryMaintenance" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> DeleteCategoryMaintenances(int CategoryMaintenancesId)
        {
            try
            {
                var CategoryMaintenances = await _context.CategoryMaintenances.FirstOrDefaultAsync(x => x.CategoryMaintenanceId == CategoryMaintenancesId);
                if (CategoryMaintenances == null)
                {
                
                _response.Message = $"can not delete this {CategoryMaintenancesId} CategoryMaintenance";
                _response.Success = false;
        }
                else { 
                CategoryMaintenances.IsActive = false;
                _response.Message = $"done to delete this {CategoryMaintenancesId} CategoryMaintenance";
                _context.CategoryMaintenances.Update(CategoryMaintenances);
                await _context.SaveChangesAsync();
                _response.Success = true;
            }
            }
            catch (Exception e)
            {
                _response.Message = $"can not delete this {CategoryMaintenancesId} CategoryMaintenance" + e.Message;
                _response.Success = false;
            }
            return _response;
        }

    }
}
