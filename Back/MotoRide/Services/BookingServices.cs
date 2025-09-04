using Azure;
using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;

namespace MotoRide.Services
{
    public class BookingServices : IBookingServices
    {
        private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _response;
        private readonly ImageServices _image;

        public BookingServices(MotoRideDbContext context,ServiceResponse response,ImageServices imageServices)
        {
            _context = context;
            _response = response;
            _image = imageServices;
        }
         
        public async Task<ServiceResponse> GetBooking(int bookingId)
        {
            try
            {
                var booking = await _context.Bookings.Where(x => x.BookingId == bookingId).FirstOrDefaultAsync();
                    if (booking != null) { 
                    var customer = await _context.Customers.Where(x => x.CustomerId == booking.CustomerId).FirstOrDefaultAsync();
                     var Maintenance = await _context.Maintenances.Where(x => x.Id == booking.MaintenanceId).FirstOrDefaultAsync();
                
                   
                _response.Data = new { booking ,customer,Maintenance};
                _response.Success = true;

                }
                else
                {
                    _response.Message = $"can not get any  booking for this maintenance" ;
                    _response.Success = false;
                }
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get any  booking for this maintenance" + e.Message;
                _response.Success = false;
                return _response;
            }
        }

        public async Task<ServiceResponse> AddBooking(AddBookingDto dto)
        {
            try
            {
                string? productImagePath = null;

                // Check if a product image file is provided
                if (dto.ImageUrl != null)
                {
                    // Save the image and get its path
                    productImagePath = await _image.Imges(dto.ImageUrl);
                }

                Booking booking = new Booking
                {
                    BikeType = dto.BikeType,
                    CreatedAt = DateTime.UtcNow,
                    CustomerNote = dto.CustomerNote,
                    ImageUrl = productImagePath,
                    Date = dto.Date,
                    Title = dto.Title,
                    StatusBookingMaintenance = "none",
                    CustomerId = dto.CustomerId,
                    Location = dto.Location,

                };
                await _context.Bookings.AddAsync(booking);
                await _context.SaveChangesAsync();
                _response.Message = "done to add booking";
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not add booking" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> AddSpecificBooking(AddBookingSpecificBookingDto dto)
        {
            try
            {
                string? productImagePath = null;

                // Check if a product image file is provided
                if (dto.ImageUrl != null)
                {
                    // Save the image and get its path
                    productImagePath = await _image.Imges(dto.ImageUrl);
                }

                Booking booking = new Booking
                {
                    BikeType = dto.BikeType,
                    CreatedAt = DateTime.UtcNow,
                    CustomerNote = dto.CustomerNote,
                    ImageUrl = productImagePath,
                    MaintenanceId=dto.MaintenanceId,
                    Date = dto.Date,
                    Title = dto.Title,
                    StatusBookingMaintenance = "none",
                    CustomerId = dto.CustomerId,
                    Location = dto.Location,

                };
                await _context.Bookings.AddAsync(booking);
                await _context.SaveChangesAsync();
                _response.Message = "done to add booking";
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not add booking" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> UpdateBooking(UpdateBookingDto dto) 
        {
            try
            {
                var booking = await _context.Bookings.FirstOrDefaultAsync(x => x.BookingId == dto.BookingId);
                if (booking == null)
                  {
                    _response.Success = true;
                    _response.Message = "can not update booking";
                    return _response;

                }
                else
                {

                    string? productImagePath = null;

                    // Check if a product image file is provided
                    if (dto.ImageUrl != null)
                    {
                        // Save the image and get its path
                        productImagePath = await _image.Imges(dto.ImageUrl);
                    }
                    booking.BikeType = dto.BikeType;
                    booking.CreatedAt = DateTime.UtcNow;
                    booking.CustomerNote = dto.CustomerNote;
                    booking.ImageUrl = productImagePath;
                    booking.MaintenanceNote = dto.MaintenanceNote;
                    booking.Date = dto.Date;
                    booking.Title = dto.Title;
                    booking.StatusBookingMaintenance = dto.StatusBookingMaintenance;
                    booking.IsAcceptableMaintaince = false;
                    booking.CustomerId = dto.CustomerId;
                    booking.MaintenanceId = dto.MaintenanceId;
                    booking.Location = dto.Location;
                    _context.Bookings.Update(booking);
                    await _context.SaveChangesAsync();
                    _response.Message = "done to add booking";
                    _response.Success = true;
                    return _response;
                }
            }
            catch (Exception e)
            {
                _response.Message = $"can not add booking" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> GetAllBookingRejectforMantaince(int maintenanceId)
        {
            try
            {
                var booking = await _context.NotificationBookingMaintenances.Where(x => x.AcceptCustomer == false&&x.MaintenanceId== maintenanceId).ToListAsync();
                _response.Data = booking;
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get any  booking for this maintenance" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> GetAllBookingAcceptforMantaince(int maintenanceId)
        {
            try
            {
                var booking = await _context.Bookings.Where(x => x.IsAcceptableUserBooking == true && x.MaintenanceId == maintenanceId).ToListAsync();
                _response.Data = booking;
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get any  booking for this maintenance" + e.Message;
                _response.Success = false;
                return _response;
            }
                 }
        public async Task<ServiceResponse> GetAllBookingPreviousforCustomer(int customerId)
        {
            try
            {
                var booking = await _context.Bookings
                    .Where(x => x.IsAcceptableUserBooking == true
                                && x.Date.HasValue
                                && DateTime.UtcNow > x.Date.Value
                                && x.CustomerId == customerId)
                    .OrderByDescending(x => x.Date)  // Sort bookings by date in descending order
                    .ToListAsync();
                _response.Data = booking;
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get any  booking for this maintenance" + e.Message;
                _response.Success = false;
                return _response;
            }
                 }
        public async Task<ServiceResponse> GetAllBookingNotReplyforMantaince(int MaintenanceId)
        {
            try
            {

                var booking = await _context.Bookings.Where(x => x.IsAcceptableMaintaince == null ).ToListAsync();
                var NotificationBookingMaintenances = await _context.NotificationBookingMaintenances.Where(x => x.MaintenanceId== MaintenanceId).ToListAsync();

                foreach (var i in NotificationBookingMaintenances)
                {
                    booking = booking.Where(x=>x.BookingId!=i.BookingId).ToList();
                }
                _response.Data = booking;
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get any  booking for this maintenance" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
      
        public async Task<ServiceResponse> GetAllBookingAcceptforCustomer(int id)
        {
            try
            {
                var booking = await _context.Bookings
                    .Where(x => x.IsAcceptableUserBooking == true
                                && x.Date.HasValue
                                && DateTime.UtcNow <= x.Date.Value
                                && x.CustomerId == id)
                    .OrderByDescending(x => x.Date).ToListAsync();
                _response.Data = booking;
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get any  booking for this maintenance" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> GetAllBookingnotConfirmforCustomer(int id)
        {
            try
            {
                var booking = await _context.Bookings.Where(x => x.IsAcceptableMaintaince == null && x.IsAcceptableUserBooking == null&& x.CustomerId == id).ToListAsync();
                _response.Data = booking;
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get any  booking for this maintenance" + e.Message;
                _response.Success = false;
                return _response;
            }
        }

        public async Task<ServiceResponse> DeleteBooking(int bookingId)
        {
            try
            {
                var booking = await _context.Bookings.FirstOrDefaultAsync(x => x.BookingId == bookingId);
                if (booking == null)
                {
                    _response.Success = true;
                    _response.Message = "can not update booking";
                    return _response;

                }
                else
                {
                    booking.IsActive = false;
                    _context.Bookings.Update(booking);
                    await _context.SaveChangesAsync();
                    _response.Message = "done to add booking";
                    _response.Success = true;
                    return _response;
                }
            }
            catch (Exception e)
            {
                _response.Message = $"can not add booking" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> GetAllBookingConfrimed()
        {
            try
            {
                var booking = await _context.Bookings.Where(x=>x.IsAcceptableUserBooking == true&&x.IsActive!=false).ToListAsync();
                _response.Data = booking;
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get any  booking for this maintenance" + e.Message;
                _response.Success = false;
                return _response;
            }
        }

        public async Task<ServiceResponse> GetAllBookingNotReplyforCustomer(int id)
        {
            {
                try
                {
                    var booking = await _context.Bookings.Where(x => x.IsAcceptableMaintaince == null && x.IsAcceptableUserBooking == null && x.CustomerId == id).ToListAsync();
                    _response.Data = booking;
                    _response.Success = true;
                    return _response;
                }
                catch (Exception e)
                {
                    _response.Message = $"can not get any  booking for this maintenance" + e.Message;
                    _response.Success = false;
                    return _response;
                }
            }
        }
        /*      public async Task<ServiceResponse> GetAllBookingRejectforMantaince(int maintenanceId)
{
   try
   {
       var booking = await _context.Bookings.Where(x => x.IsAcceptableUserBooking == false&&x.MaintenanceId== maintenanceId).ToListAsync();
       _response.Data = booking;
       _response.Success = true;
       return _response;
   }
   catch (Exception e)
   {
       _response.Message = $"can not get any  booking for this maintenance" + e.Message;
       _response.Success = false;
       return _response;
   }
}
public async Task<ServiceResponse> GetAllBookingAcceptforMantaince(int maintenanceId)
{
   try
   {
       var booking = await _context.Bookings.Where(x => x.IsAcceptableUserBooking == true && x.MaintenanceId == maintenanceId).ToListAsync();
       _response.Data = booking;
       _response.Success = true;
       return _response;
   }
   catch (Exception e)
   {
       _response.Message = $"can not get any  booking for this maintenance" + e.Message;
       _response.Success = false;
       return _response;
   }
}
public async Task<ServiceResponse> GetAllBookingNotReplyforMantaince(int maintenanceId)
{
   try
   {
       var booking = await _context.Bookings.Where(x => x.IsAcceptableMaintaince == null && x.MaintenanceId == maintenanceId).ToListAsync();
       _response.Data = booking;
       _response.Success = true;
       return _response;
   }
   catch (Exception e)
   {
       _response.Message = $"can not get any  booking for this maintenance" + e.Message;
       _response.Success = false;
       return _response;
   }
}*/

    }
}
