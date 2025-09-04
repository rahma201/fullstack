using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.IServices;
using MotoRide.Models;

namespace MotoRide.Services
{
    public class AdminServices : IAdminServices
    {
        private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _response;
        public AdminServices(MotoRideDbContext context, ServiceResponse response )
        {
            _context = context;
            _response = response;
        }

        public async Task<ServiceResponse> countBooking()
        {
            try
            {
                
                var booking = _context.Bookings.Where(x => x.IsAcceptableUserBooking == true && x.IsActive !=false).Count();
                if (booking == 0)
                {
                    _response.Success = false;
                    _response.Message = "Can not get any booking";
                    _response.Data = 0;
                }
                else
                {
                    _response.Success = true; 
                    _response.Data = booking;
                }
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Can not get any booking"+ex.Message;
                _response.Data = 0;
              

            } 
            return _response;
        }
        public async Task<ServiceResponse> countOrders()
        {
            try
            {

                var order = _context.Orders.Count();
                if (order == 0)
                {
                    _response.Success = false;
                    _response.Message = "Can not get any order";
                    _response.Data = 0;
                }
                else
                {
                    _response.Success = true;
                    _response.Data = order;
                }
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Can not get any order" + ex.Message;
                _response.Data = 0;


            }
            return _response;
        }

        public async Task<ServiceResponse> countEvent()
        {
            try
            {

                var booking = _context.Events.Where(x => x.IsApproved == true ).Count();
                if (booking == 0)
                {
                    _response.Success = false;
                    _response.Message = "Can not get any booking";
                    _response.Data = 0;
                }
                else
                {
                    _response.Success = true;
                    _response.Data = booking;
                }
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Can not get any booking" + ex.Message;
                _response.Data = 0;


            }
            return _response;
        }


        public async Task<ServiceResponse> countMotorcylce()
        {
            try
            {

                var booking = _context.Motorcycles.Where(x =>  x.IsActive !=false).Count();
                if (booking == 0)
                {
                    _response.Success = false;
                    _response.Message = "Can not get any booking";
                    _response.Data = 0;
                }
                else
                {
                    _response.Success = true;
                    _response.Data = booking;
                }
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Can not get any booking" + ex.Message;
                _response.Data = 0;


            }
            return _response;
        }

        public async Task<ServiceResponse> countProduct()
        {
            try
            {

                var product = _context.Products.Where(x => x.IsActive !=false).Count();
                if (product == 0)
                {
                    _response.Success = false;
                    _response.Message = "Can not get any Products";
                    _response.Data = 0;
                }
                else
                {
                    _response.Success = true;
                    _response.Data = product;
                }
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Can not get any Products" + ex.Message;
                _response.Data = 0;


            }
            return _response;
        }

        public async Task<ServiceResponse> countUser()
        {
            try
            {

                var customrer = _context.Customers.Where(x =>  x.IsActive !=false).Count();
                var store = _context.Stores.Where(x => x.IsActive !=false && x.IsCanLogin == true).Count();
                var maintenances = _context.Maintenances.Where(x => x.IsActive !=false && x.IsCanLogin == true).Count();
                var coverment = _context.Users.Where(x => x.IsActive !=false && x.UserType == "goverment").Count();
                var Admain = _context.Users.Where(x => x.IsActive !=false && x.UserType=="admain").Count();
                var year = DateTime.UtcNow.Year;
                var customrerYear = _context.Customers.Where(x => x.IsActive !=false&&x.CreatedAt.Value.Year== year).Count();
                var storeYear = _context.Stores.Where(x => x.IsActive !=false && x.IsCanLogin == true && x.CreatedAt.Value.Year == year).Count();
                var maintenancesYear = _context.Maintenances.Where(x => x.IsActive !=false && x.IsCanLogin == true && x.CreatedAt.Value.Year == year).Count();
                var covermentYear = _context.Users.Where(x => x.IsActive !=false && x.UserType == "goverment" && x.CreatedAt.Value.Year == year).Count();
                var AdmainYear = _context.Users.Where(x => x.IsActive !=false && x.UserType == "admain" && x.CreatedAt.Value.Year == year).Count();
                var Month = DateTime.UtcNow.Month;
                var customrerMonth = _context.Customers.Where(x => x.IsActive !=false && x.CreatedAt.Value.Month == Month).Count();
                var storeMonth = _context.Stores.Where(x => x.IsActive !=false && x.IsCanLogin == true && x.CreatedAt.Value.Month == Month).Count();
                var maintenancesMonth = _context.Maintenances.Where(x => x.IsActive !=false && x.IsCanLogin == true && x.CreatedAt.Value.Month == Month).Count();
                var covermentMonth = _context.Users.Where(x => x.IsActive !=false && x.UserType == "goverment" && x.CreatedAt.Value.Month == Month).Count();
                var AdmainMonth = _context.Users.Where(x => x.IsActive !=false && x.UserType == "admain" && x.CreatedAt.Value.Month == Month).Count();
                var day = DateTime.UtcNow.Day;
                var customrerDay = _context.Customers.Where(x => x.IsActive !=false && x.CreatedAt.Value.Day == day).Count();
                var storeDay = _context.Stores.Where(x => x.IsActive !=false && x.IsCanLogin == true && x.CreatedAt.Value.Day == day).Count();
                var maintenancesDay = _context.Maintenances.Where(x => x.IsActive !=false && x.IsCanLogin == true && x.CreatedAt.Value.Day == day).Count();
                var covermentDay = _context.Users.Where(x => x.IsActive !=false && x.UserType == "goverment" && x.CreatedAt.Value.Day == day).Count();
                var AdmainDay = _context.Users.Where(x => x.IsActive !=false && x.UserType == "admain" && x.CreatedAt.Value.Day == day).Count();

                _response.Success = true;
                    _response.Data = new
                    {
                        customrer,
                        store,
                        maintenances,
                        coverment,
                        Admain,
                        customrerYear,
                        storeYear,
                        maintenancesYear,
                        covermentYear,
                        AdmainYear,
                        customrerMonth,
                        storeMonth,
                        maintenancesMonth,
                        covermentMonth,
                        AdmainMonth,
                        customrerDay,
                        storeDay,
                        maintenancesDay,
                        covermentDay,
                        AdmainDay
                        ,

                    };
                
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Can not get any booking" + ex.Message;
                _response.Data = _response.Data = new
                {
                    customrer=0,
                    store = 0,
                    maintenances = 0,
                    coverment = 0,
                    Admain = 0,

                }; ;


            }
            return _response;
        }

        public async Task<ServiceResponse> BookingInYearByMaintenance()
        {
            try
            {
                var year = DateTime.UtcNow.Year;

                // Group the bookings by MaintenanceId and count them
                var booking = await _context.Bookings
                    .Where(x => x.IsAcceptableUserBooking == true && x.IsActive != false&& x.CreatedAt.Value.Year == year)
                    .Include(x=>x.Maintenance)
                    .GroupBy(x => x.MaintenanceId)
                    .Select(x => new
                    {
                        MaintenanceId = x.Key,
                        x.FirstOrDefault().Maintenance.MaintenanceName,
                        BookingCount = x.Count()
                    })
                    .ToListAsync(); // Make sure to call ToListAsync to execute the query asynchronously

                // Check if no bookings were found
                if (booking.Count == 0)
                {
                    _response.Success = false;
                    _response.Message = "Cannot get any booking";
                    _response.Data = 0;
                }
                else
                {
                    _response.Success = true;
                    _response.Data = booking; // Return the booking data
                }
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Cannot get any booking: " + ex.Message;
                _response.Data = 0;
            }

            return _response;
        }

        public async Task<ServiceResponse> OrdersInYearByShop()
        {
            try
            {
                var year = DateTime.UtcNow.Year;

                // Group the bookings by MaintenanceId and count them
                var booking = await _context.OrderItems
                    .Where(x =>  x.CreatedAt.Year == year)
                    .Include(x => x.store)
                    .GroupBy(x => x.StoreId)
                    .Select(x => new
                    {
                        StoreId = x.Key,
                        x.FirstOrDefault().store.StoreName,
                        OrderCount = x.Count()
                    })
                    .ToListAsync(); // Make sure to call ToListAsync to execute the query asynchronously

                // Check if no bookings were found
                if (booking.Count == 0)
                {
                    _response.Success = false;
                    _response.Message = "Cannot get any booking";
                    _response.Data = 0;
                }
                else
                {
                    _response.Success = true;
                    _response.Data = booking; // Return the booking data
                }
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Cannot get any booking: " + ex.Message;
                _response.Data = 0;
            }

            return _response;
        }

        public async Task<ServiceResponse> BookingInMonthByMaintnanece()
        {
            try
            {
                var month = DateTime.UtcNow.Month;

                // Group the bookings by MaintenanceId and count them
                var booking = await _context.Bookings
                    .Where(x => x.IsAcceptableUserBooking == true && x.IsActive != false && x.CreatedAt.Value.Month == month)
                    .Include(x => x.Maintenance)
                    .GroupBy(x => x.MaintenanceId)
                    .Select(x => new
                    {
                        MaintenanceId = x.Key,
                        x.FirstOrDefault().Maintenance.MaintenanceName,
                        BookingCount = x.Count()
                    })
                    .ToListAsync(); // Make sure to call ToListAsync to execute the query asynchronously

                // Check if no bookings were found
                if (booking.Count == 0)
                {
                    _response.Success = false;
                    _response.Message = "Cannot get any booking";
                    _response.Data = 0;
                }
                else
                {
                    _response.Success = true;
                    _response.Data = booking; // Return the booking data
                }
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Cannot get any booking: " + ex.Message;
                _response.Data = 0;
            }

            return _response;
        }

        public async Task<ServiceResponse> OrdersInMonthByShop()
        {
            try
            {
                var month = DateTime.UtcNow.Month;

                // Group the bookings by MaintenanceId and count them
                var booking = await _context.OrderItems
                    .Where(x => x.CreatedAt.Month == month)
                    .Include(x => x.store)
                    .GroupBy(x => x.StoreId)
                    .Select(x => new
                    {
                        StoreId = x.Key,
                        x.FirstOrDefault().store.StoreName,
                        OrderCount = x.Count()
                    })
                    .ToListAsync(); // Make sure to call ToListAsync to execute the query asynchronously

                // Check if no bookings were found
                if (booking.Count == 0)
                {
                    _response.Success = false;
                    _response.Message = "Cannot get any booking";
                    _response.Data = 0;
                }
                else
                {
                    _response.Success = true;
                    _response.Data = booking; // Return the booking data
                }
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Cannot get any booking: " + ex.Message;
                _response.Data = 0;
            }

            return _response;
        }
        public async Task<ServiceResponse> BookingByMaintnanece()
        {
            try
            {

                // Group the bookings by MaintenanceId and count them
                var booking = await _context.Bookings
                    .Where(x => x.IsAcceptableUserBooking == true && x.IsActive != false)
                    .Include(x => x.Maintenance)
                    .GroupBy(x => x.MaintenanceId)
                    .Select(x => new
                    {
                        MaintenanceId = x.Key,
                        x.FirstOrDefault().Maintenance.MaintenanceName,
                        BookingCount = x.Count()
                    })
                    .ToListAsync(); // Make sure to call ToListAsync to execute the query asynchronously

                // Check if no bookings were found
                if (booking.Count == 0)
                {
                    _response.Success = false;
                    _response.Message = "Cannot get any booking";
                    _response.Data = 0;
                }
                else
                {
                    _response.Success = true;
                    _response.Data = booking; // Return the booking data
                }
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Cannot get any booking: " + ex.Message;
                _response.Data = 0;
            }

            return _response;
        }

        public async Task<ServiceResponse> OrdersByShop()
        {
            try
            {


                // Group the bookings by MaintenanceId and count them
                var booking = await _context.OrderItems
                    .Include(x => x.store)
                    .GroupBy(x => x.StoreId)
                    .Select(x => new
                    {
                        StoreId = x.Key,
                        x.FirstOrDefault().store.StoreName,
                        OrderCount = x.Count()
                    })
                    .ToListAsync(); // Make sure to call ToListAsync to execute the query asynchronously

                // Check if no bookings were found
                if (booking.Count == 0)
                {
                    _response.Success = false;
                    _response.Message = "Cannot get any booking";
                    _response.Data = 0;
                }
                else
                {
                    _response.Success = true;
                    _response.Data = booking; // Return the booking data
                }
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Cannot get any booking: " + ex.Message;
                _response.Data = 0;
            }

            return _response;
        }
    }
}
