using Azure;
using INTEGRATEDAPI.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;
using System.Runtime.Serialization.Formatters;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MotoRide.Services
{
    public class MaintanceServices : IMaintanceServices
    {
        private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _response;
        public MaintanceServices(MotoRideDbContext context, ServiceResponse response)
        {
            _context = context;
            _response = response;

        }
        public async Task<ServiceResponse> GetAllMaintance()
        {
            try
            {
                var mantenances = await _context.Maintenances.Where(x => x.IsActive != false)
                                     .GroupBy(x => new
                                     {
                                         x.Id,
                                         x.MaintenanceName
                                     }).Select(X => new { X.Key.Id, X.Key.MaintenanceName, X.First().Location }).ToListAsync();
                if (mantenances != null)
                {
                    _response.Data = mantenances;
                    _response.Success = true;
                }
                else
                {
                    _response.Message = "can not get any Maintenances";
                    _response.Success = false;
                }
                return _response;
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> GetAllMaintanceByCategory(int categoryMaintenanceId)
        {
            try
            {
                var maintenances = await _context.Maintenances
                    .Where(x => x.IsActive != false &&
                                x.Categories!.Any(c => c.CategoryMaintenanceId == categoryMaintenanceId))
                    .Select(x => new
                    {
                        x.Id,
                        x.MaintenanceName,
                        x.Location
                    })
                    .ToListAsync();

                if (maintenances.Any())
                {
                    _response.Data = maintenances;
                    _response.Success = true;
                }
                else
                {
                    _response.Message = "No Maintenances found for this category.";
                    _response.Success = false;
                }

                return _response;
            }
            catch (Exception ex)
            {
                _response.Message = $"Error: {ex.Message}";
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> UpdateProfileMaintance(UpdateMaintanceDto dto)
        {
            try
            {
                var maintenanc = await _context.Maintenances
                    .Include(m => m.Categories) // مهم جدًا لجلب العلاقة الحالية
                    .FirstOrDefaultAsync(x => x.Id == dto.Id);

                if (maintenanc == null)
                {
                    _response.Message = $"Cannot find maintenance";
                    _response.Success = false;
                    return _response;
                }

                // تحديث البيانات الأساسية
                maintenanc.MaintenanceName = dto.MaintenanceName;
                maintenanc.Description = dto.MaintenanceDescription;
                maintenanc.Location = dto.Location;
                maintenanc.Email = dto.Email;
                maintenanc.Phone = dto.Phone;

                // جلب الفئات الجديدة
                var newCategories = await _context.CategoryMaintenances
                    .Where(c => dto.CategoryIds.Contains(c.CategoryMaintenanceId))
                    .ToListAsync();

                // تحديث العلاقة many-to-many
                maintenanc.Categories = newCategories;

                _context.Maintenances.Update(maintenanc);
                await _context.SaveChangesAsync();

                _response.Message = "Maintenance profile updated successfully";
                _response.Success = true;
            }
            catch (Exception e)
            {
                _response.Message = $"Error updating maintenance: {e.Message}";
                _response.Success = false;
            }

            return _response;
        }
        public async Task<ServiceResponse> GetMaintanceById(int id)
        {
            {
                try
                {
                    var maintenanc = await _context.Maintenances.Select(x => new { x.Location, x.Description, x.Categories, x.Id, x.MaintenanceName, x.Phone, x.Email, x.WorkHoursId }).FirstOrDefaultAsync(x => x.Id == id);
                    var mainWorkHourstenanc = await _context.WorkHours.FirstOrDefaultAsync(x => x.MaintanenceId == maintenanc.Id)
                     ;
                    if (maintenanc == null)
                    {
                        _response.Message = $"can not get this maintance";
                        _response.Success = false;
                    }
                    else
                    {

                        _response.Data = new { maintenanc, mainWorkHourstenanc };
                        _response.Message = "done to update maintenanc";
                        _response.Success = true;
                    }
                }
                catch (Exception e)
                {
                    _response.Message = $"can not get this maintenanc" + e.Message;
                    _response.Success = false;
                }
                return _response;

            }
        }
        public async Task<ServiceResponse> UpdateWorkHourse(UpdateWorkHourseDto dto)
        {

            try
            {
                var maintenanc = await _context.WorkHours.FirstOrDefaultAsync(x => x.WorkHoursId == dto.WorkHoursId);
                if (maintenanc == null)
                {
                    _response.Message = $"can not get WorkHourse for this maintance ";
                    _response.Success = false;
                }
                else
                {


                    maintenanc.StartSaturday = dto.StartSaturday;
                    maintenanc.EndSaturday = dto.EndSaturday;
                    maintenanc.StartSunday = dto.StartSunday;
                    maintenanc.EndSunday = dto.EndSunday;
                    maintenanc.StartMonday = dto.StartMonday;
                    maintenanc.EndMonday = dto.EndMonday;
                    maintenanc.StartTuesday = dto.StartTuesday;
                    maintenanc.EndTuesday = dto.EndTuesday;
                    maintenanc.StartWednesday = dto.StartWednesday;
                    maintenanc.EndWednesday = dto.EndWednesday;
                    maintenanc.StartThursday = dto.StartThursday;
                    maintenanc.EndThursday = dto.EndThursday;
                    maintenanc.StartFriday = dto.StartFriday;
                    maintenanc.EndFriday = dto.EndFriday;
                    maintenanc.MaintanenceId = dto.MaintanenceId;
                    _context.WorkHours.Update(maintenanc);

                    await _context.SaveChangesAsync();
                    _response.Message = "done to update WorkHourse for  maintenanc";
                    _response.Success = true;
                }
            }
            catch (Exception e)
            {
                _response.Message = $"can not get WorkHourse for this maintance" + e.Message;
                _response.Success = false;
            }
            return _response;


        }
        public async Task<ServiceResponse> GetAllMaintanceAccept()
        {
            try
            {
                var shops = await _context.Maintenances.Where(x => x.IsActive != false && x.IsCanLogin == true).ToListAsync();

                if (shops != null)
                {
                    _response.Data = shops;
                    _response.Success = true;
                }
                else
                {
                    _response.Message = "can not get any shop";
                    _response.Success = false;
                }
                return _response;
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> GetAllMaintanceNotReplay()
        {
            try
            {
                var shops = await _context.Maintenances.Where(x => x.IsActive != false && x.IsCanLogin == null).ToListAsync();

                if (shops != null)
                {
                    _response.Data = shops;
                    _response.Success = true;
                }
                else
                {
                    _response.Message = "can not get any shop";
                    _response.Success = false;
                }
                return _response;
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> GetAllMaintanceReject()
        {
            try
            {
                var shops = await _context.Maintenances.Where(x => x.IsActive != false && x.IsCanLogin == false).ToListAsync();

                if (shops != null)
                {
                    _response.Data = shops;
                    _response.Success = true;
                }
                else
                {
                    _response.Message = "can not get any shop";
                    _response.Success = false;
                }
                return _response;
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> GetAllServicesForMaintance(int maintenanceId)
        {
            try
            {
                List<string> services = new List<string>();
                var maintenances = await _context.Maintenances.Where(x => x.IsActive != false && x.Id == maintenanceId).ToListAsync();

                if (maintenances != null)
                {
                    _response.Data = services;
                    _response.Success = true;
                }
                else
                {
                    _response.Message = "can not get any shop";
                    _response.Success = false;
                }
                return _response;
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message;
                _response.Success = false;
                return _response;
            }
        }

        public async Task<ServiceResponse> SearchMaintenance(string? name)
        {
            {
                try
                {
                    var mantenances = await _context.Maintenances.Where(x => x.IsActive != false && x.MaintenanceName.ToLower().Contains(name.ToLower()) || x.Location.ToLower().Contains(name.ToLower()))
                                           .GroupBy(x => new
                                           {
                                               x.Id,
                                               x.MaintenanceName
                                           }).Select(X => new { X.Key.Id, X.Key.MaintenanceName, X.First().Location }).ToListAsync();
                    if (mantenances != null)
                    {
                        _response.Data = mantenances;
                        _response.Success = true;
                    }
                    else
                    {
                        _response.Message = "can not get any Maintenances";
                        _response.Success = false;
                    }
                    return _response;
                }
                catch (Exception ex)
                {
                    _response.Message = ex.Message;
                    _response.Success = false;
                    return _response;
                }
            }
        }

        public async Task<ServiceResponse> AllowMointenanceToLogin(AllowLoginDto dto)
        {
            try
            {
                var maintenances = await _context.Maintenances.FirstOrDefaultAsync(x => x.Id == dto.Id);
                if (maintenances == null)
                {
                    _response.Success = false;
                    _response.Message = "can not allow login for this Maintenances";
                }
                else
                {
                    maintenances.IsCanLogin = dto.IsCanLogin;
                    _context.Maintenances.Update(maintenances);
                    await _context.SaveChangesAsync();
                    _response.Success = true;
                    _response.Message = "done to allow login for this Maintenances";
                }
                return _response;
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "can not allow login for this Maintenances" + ex.Message;
                return _response;
            }
        }

        public async Task<ServiceResponse> GetHowManyBookinMaintance(int id)
        {
            {
                try
                {
                    var maintenances = _context.NotificationBookingMaintenances.Where(x => x.IsActive != false && x .MaintenanceId== id && x.AcceptCustomer==true).Count();


                    _response.Data = maintenances;
                    _response.Success = true;

                    return _response;
                }
                catch (Exception ex)
                {
                    _response.Message = ex.Message;
                    _response.Success = false;
                    return _response;
                }
            }
        }
  
        public async Task<ServiceResponse> GetHowManyBookinMaintanceReject(int id)
        {
            {
                try
                {
                    List<string> services = new List<string>();
                    var maintenances = await _context.NotificationBookingMaintenances.Where(x => x.IsActive != false && x.MaintenanceId == id && x.AcceptCustomer == false).ToListAsync();
                    if (maintenances != null)
                    {
                        _response.Data = services;
                        _response.Success = true;
                    }
                    else
                    {
                        _response.Message = "can not get any shop";
                        _response.Success = false;
                    }
                    return _response;
                }
                catch (Exception ex)
                {
                    _response.Message = ex.Message;
                    _response.Success = false;
                    return _response;
                }
            }
        }



        // Get Maintenance Stats by Maintenance ID
        public async Task<ServiceResponse> GetMaintenanceStats(int maintenanceId)
        {
            // Most Popular Service Type: Group by BikeType and order by the count of each group
            var mostPopularService = await _context.Bookings
                .Where(b => b.MaintenanceId == maintenanceId)
                .GroupBy(b => b.BikeType)  // Group by BikeType (or any other field you need)
                .Select(g => new { BikeType = g.Key, Count = g.Count() }) // Calculate count of each group
                .OrderByDescending(g => g.Count)  // Order by count in descending order
                .FirstOrDefaultAsync();

            // Total Services
            var totalServices = await _context.Maintenances
                .Where(m => m.Id == maintenanceId)
                .CountAsync();

            // Service Count per Category (e.g., by BikeType)
            var serviceCountByCategory = await _context.Bookings
                .Where(b => b.MaintenanceId == maintenanceId)
                .GroupBy(b => b.BikeType)  // You can change this to another category like ServiceType
                .Select(g => new { Category = g.Key, Count = g.Count() })
                .ToListAsync();

            // Prepare response model
            var response = new ServiceResponse();

            if (mostPopularService != null)
            {
                response.Data = new
                {
                    MostPopularService = mostPopularService,
                    TotalServices = totalServices,
                    ServiceCountByCategory = serviceCountByCategory
                };
                response.Success = true;
            }
            else
            {
                response.Message = "No maintenance stats found for this maintenance.";
                response.Success = false;
            }

            return response;
        }

        // Get Top Customers by Maintenance ID
        public async Task<ServiceResponse> GetTopCustomers(int maintenanceId)
        {            var response = new ServiceResponse();

            var topCustomers = _context.Bookings
         .Where(c => c.MaintenanceId == maintenanceId)
         .Include(x => x.Customer)
         .GroupBy(x => new { x.CustomerId, x.Customer.Username }) // Grouping by CustomerId and Customer.Username
         .Select(g => new
         {
             CustomerId = g.Key.CustomerId,  // Extract CustomerId from the key
             Username = g.Key.Username,      // Extract Username from the key
             Count = g.Count()                 
         })
         .OrderByDescending(x => x.Count)
         .Take(5)
         .ToList();



            if (topCustomers.Any())
            {
                response.Data = topCustomers;
                response.Success = true;
            }
            else
            {
                response.Message = "No top customers found for this maintenance.";
                response.Success = false;
            }
            return response;
        }

        // Get Monthly Achievements by Maintenance ID
        public async Task<ServiceResponse> GetMonthlyAchievements(int maintenanceId)
        {
            var thisMonth = DateTime.Now.Month;
            var totalServices = await _context.Bookings
                .Where(m => m.MaintenanceId == maintenanceId && m.CreatedAt.Value.Month == thisMonth)
                .CountAsync();

            var model = totalServices;

            var response = new ServiceResponse
            {
                Data = model,
                Success = true
            };

            return response;
        }

        // Get Count of Maintenance in Day by Maintenance ID
        public async Task<ServiceResponse> GetCountMaintenanceInDay(int maintenanceId)
        {
            var today = DateTime.Now.Date;
            var totalServices = await _context.Bookings
                .Where(m => m.MaintenanceId == maintenanceId && m.CreatedAt.Value.Date == today)
                .CountAsync();

            var response = new ServiceResponse
            {
                Data = totalServices,
                Success = true
            };

            return response;
        }

        // Get Count of Maintenance in Year by Maintenance ID
        public async Task<ServiceResponse> GetCountMaintenanceInYear(int maintenanceId)
        {
            var thisYear = DateTime.Now.Year;
            var totalServices = await _context.Bookings
                .Where(m => m.MaintenanceId == maintenanceId && m.CreatedAt.Value.Year == thisYear)
                .CountAsync();

            var response = new ServiceResponse
            {
                Data = totalServices,
                Success = true
            };

            return response;
        }
        public async Task<ServiceResponse> TopMostPopularityMaintenance()
        {   var response = new ServiceResponse();
            try
            {
             

                // Group orders by MotorcycleId and count them, selecting relevant data
                var product = await _context.Bookings
                    .Where(x => x.IsAcceptableUserBooking == true)
                    .Include(x => x.Maintenance) // Ensure Motorcycle is included
                    .GroupBy(x => x.MaintenanceId) // Group by MotorcycleId
                    .Select(x => new
                    {
                        MaintenanceId = x.Key,
                        Name = x.FirstOrDefault().Maintenance.MaintenanceName,
                        Location = x.FirstOrDefault().Maintenance.Location,
                        OrderCount = x.Count() // Count the number of orders for each motorcycle
                    })
                    .OrderByDescending(x => x.OrderCount) // Order by OrderCount descending
                    .Take(10) // Take the top 10 motorcycles
                    .ToListAsync();

                if (product.Count==0
                    ) // Check if no motorcycles were found
                {
                    response.Message = "Cannot get any Motorcycles";
                    response.Success = false;
                }
                else
                {
                    response.Data = product;
                    response.Success = true;
                }
            }
            catch (Exception e)
            {
                response.Message = "Cannot get all Motorcycles: " + e.Message;
response.Success = false;
            }
            return response;
        }
        public async Task<ServiceResponse> GetWorkHourseByMaintanceId(int maintenanceId)
        {
            
                {
                    try
                    {
                        var maintenancWorkHours = await _context.WorkHours.FirstOrDefaultAsync(x => x.MaintanenceId == maintenanceId)
                         ;
                        if (maintenancWorkHours == null)
                        {
                            _response.Message = $"can not get this maintance";
                            _response.Success = false;
                        }
                        else
                        {

                            _response.Data = maintenancWorkHours;
                            _response.Message = "done to update maintenanc";
                            _response.Success = true;
                        }
                    }
                    catch (Exception e)
                    {
                        _response.Message = $"can not get this maintenanc" + e.Message;
                        _response.Success = false;
                    }
                    return _response;

                }
            }
        }
    }


