using Azure;
using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Migrations;
using MotoRide.Models;
using static System.Net.Mime.MediaTypeNames;
using NotificationBookingMaintenance = MotoRide.Models.NotificationBookingMaintenance;

namespace MotoRide.Services
{
    public class NotificationBookingMaintenanceServices : INotificationBookingMaintenanceServices
    {
        private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _response;

        public NotificationBookingMaintenanceServices(MotoRideDbContext context, ServiceResponse response)
        {
            _context = context;
            _response = response;
        }
        public async Task<ServiceResponse> AddNotificationBookingMaintenance(AddNotificationBookingMaintenanceDto dto)
        {
            try
            {

               NotificationBookingMaintenance notificationBookingMaintenance = new NotificationBookingMaintenance()
                {

                    AcceptMaintenance = true,
                    BookingId = dto.BookingId,
                    MaintenanceId = dto.MaintenanceId,
                    CreateAt = DateTime.Now,
                    CustomerId=dto.CustomerId,
                    Price = dto.Price,
                    MaintenanceNote = dto.MaintenanceNote,


                };
                await _context.NotificationBookingMaintenances.AddAsync(notificationBookingMaintenance);
                await _context.SaveChangesAsync();
                _response.Message = "done to add notificationBookingMaintenance";
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not add notificationBookingMaintenance" + e.Message;
                _response.Success = false;
                return _response;
            }
        }


        public async Task<ServiceResponse> GetAllNotificationBookingMaintenance(int bookingId)
        {

            try
            {
                var notificationBookingMaintenances = await _context.NotificationBookingMaintenances.Where(x => x.IsActive != false&&x.BookingId== bookingId).ToListAsync();
                if (notificationBookingMaintenances == null)
                {
                    _response.Success = true;
                    _response.Message = "can not get NotificationBookingMaintenances";
                    return _response;

                }
                else
                {
                    _response.Data = notificationBookingMaintenances;
                    _response.Success = true;
                    return _response;
                }
            }
            catch (Exception e)
            {
                _response.Message = $"can not get notification booking" + e.Message;
                _response.Success = false;
                return _response;
            }

        }

        public async Task<ServiceResponse> GetNotificationBookingMaintenance(int notificationBookingMaintenanceId)
        {
            try
            {
                var notificationBookingMaintenances = await _context.NotificationBookingMaintenances.FirstOrDefaultAsync(x => x.Id == notificationBookingMaintenanceId);
                if (notificationBookingMaintenances == null)
                {
                    _response.Success = true;
                    _response.Message = "can not get NotificationBookingMaintenances";
                    return _response;

                }
                else
                {
                    _response.Data = notificationBookingMaintenances;
                    _response.Success = true;
                    return _response;
                }
            }
            catch (Exception e)
            {
                _response.Message = $"can not get notification booking" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> AddResponseforNotificationBookingFromCustomer(UpdateNotificationBookingMaintenanceDto dto)
        {
            try
            {
                var notificationBookingMaintenances = await _context.NotificationBookingMaintenances.FirstOrDefaultAsync(x => x.Id == dto.Id);
                if (notificationBookingMaintenances == null)
                {
                    _response.Success = true;
                    _response.Message = "can not update NotificationBookingMaintenances";
                    return _response;

                }
                else
                {
                    notificationBookingMaintenances.AcceptCustomer = dto.AcceptCustomer;

                    _context.NotificationBookingMaintenances.Update(notificationBookingMaintenances);
                    await _context.SaveChangesAsync();
                    var booking = await _context.Bookings.Where(x => x.BookingId == notificationBookingMaintenances.BookingId ).FirstOrDefaultAsync();
                    if (booking == null)
                    {
                        _response.Success = true;
                        _response.Message = "can not update booking";
                        return _response;

                    }
                    else
                    {

                        booking.IsAcceptableUserBooking = dto.AcceptCustomer;
                        booking.IsAcceptableMaintaince = true;
                        booking.MaintenanceId = notificationBookingMaintenances.MaintenanceId;
                        booking.MaintenanceNote = notificationBookingMaintenances.MaintenanceNote;
                        booking.TotalPrice = (float?)notificationBookingMaintenances.Price;

                        _context.Bookings.Update(booking);
                        await _context.SaveChangesAsync();
                        _response.Message = "done to add booking";
                        _response.Success = true;
                        return _response;


                    }
                }
            }
            catch (Exception e)
            {
                _response.Message = $"can not add booking" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> DeleteNotificationBookingMaintenance(int notificationBookingMaintenanceId)
        {
            try
            {
                var notificationBookingMaintenances = await _context.NotificationBookingMaintenances.FirstOrDefaultAsync(x => x.Id == notificationBookingMaintenanceId);
                if (notificationBookingMaintenances == null)
                {
                    _response.Success = true;
                    _response.Message = "can not update NotificationBookingMaintenances";
                    return _response;

                }
                else
                {
                    notificationBookingMaintenances.IsActive = false;
                    _context.NotificationBookingMaintenances.Update(notificationBookingMaintenances);
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

        public async Task<ServiceResponse> GetAllNotificationBookingMaintenanceByMaintenance(int maintenanceId)
        {

            try
            {
                var notificationBookingMaintenances = await _context.NotificationBookingMaintenances.Where(x => x.IsActive != false && x.MaintenanceId == maintenanceId).ToListAsync();
                if (notificationBookingMaintenances == null)
                {
                    _response.Success = true;
                    _response.Message = "can not get NotificationBookingMaintenances";
                    return _response;

                }
                else
                {
                    _response.Data = notificationBookingMaintenances;
                    _response.Success = true;
                    return _response;
                }
            }
            catch (Exception e)
            {
                _response.Message = $"can not get notification booking" + e.Message;
                _response.Success = false;
                return _response;
            }

        }


     
        public async Task<ServiceResponse> GetAllNotificationfavouriteCustomer(int id)
        {
            try
            {
                var booking = await _context.NotificationBookingMaintenances.Where(x => x.Isfavourite == true && x.BookingId == id).Include(x => x.Maintenance).ToListAsync();
                _response.Data = booking;
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get any  booking for this customer" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> GetAllNotificationRejectCustomer(int bookingId)
        {
            try
            {
                var booking = await _context.NotificationBookingMaintenances.Where(x => x.AcceptCustomer == false && x.BookingId == bookingId).Include(x => x.Maintenance).ToListAsync();
                _response.Data = booking;
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get any  booking for this customer" + e.Message;
                _response.Success = false;
                return _response;
            }
        }
        public async Task<ServiceResponse> GetAllNotificationNotReplayCustomer(int bookingId)
        {
            try
            {
                var booking = await _context.NotificationBookingMaintenances.Where(x => x.AcceptCustomer == null && x.BookingId == bookingId).Include(x=>x.Maintenance).ToListAsync();
                if(booking.All(x=>x.AcceptCustomer!=true))_response.Data = booking;
                _response.Success = true;
                return _response;
            }
            catch (Exception e)
            {
                _response.Message = $"can not get any  booking for this " + e.Message;
                _response.Success = false;
                return _response;
            }
        }

        public Task<ServiceResponse> AddFastNotificationBookingMaintenance(AddNotificationBookingMaintenanceDto dto)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse> AddNotificationFavourite(int notificationId)
        {
            try
            {
                var notificationBookingMaintenances = await _context.NotificationBookingMaintenances.FirstOrDefaultAsync(x => x.Id == notificationId);
                if (notificationBookingMaintenances == null)
                {
                    _response.Success = true;
                    _response.Message = "can not update NotificationBookingMaintenances";
                    return _response;

                }
                else
                {
                    notificationBookingMaintenances.Isfavourite = true;
                    _context.NotificationBookingMaintenances.Update(notificationBookingMaintenances);
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

        public async Task<ServiceResponse> DeleteNotificationFavourite(int notificationId)
        {
            try
            {
                var notificationBookingMaintenances = await _context.NotificationBookingMaintenances.FirstOrDefaultAsync(x => x.Id == notificationId);
                if (notificationBookingMaintenances == null)
                {
                    _response.Success = true;
                    _response.Message = "can not Delete Notification Favourite";
                    return _response;

                }
                else
                {
                    notificationBookingMaintenances.Isfavourite = false;
                    _context.NotificationBookingMaintenances.Update(notificationBookingMaintenances);
                    await _context.SaveChangesAsync();
                    _response.Message = "done to Delete Notification Favourite";
                    _response.Success = true;
                    return _response;
                }
            }
            catch (Exception e)
            {
                _response.Message = $"can not Delete Notification Favourite" + e.Message;
                _response.Success = false;
                return _response;
            }
        }

        public async Task<ServiceResponse> GetAllNotificationRejectCustomerForMaintenance(int maintenanceId)
        {
          try  {
                var notificationBookingMaintenances = await _context.NotificationBookingMaintenances.Where(x => x.IsActive != false&&x.AcceptCustomer==false && x.MaintenanceId == maintenanceId).ToListAsync();
                if (notificationBookingMaintenances == null)
                {
                    _response.Success = true;
                    _response.Message = "can not get NotificationBookingMaintenances";
                    return _response;

                }
                else
                {
                    _response.Data = notificationBookingMaintenances;
                    _response.Success = true;
                    return _response;
                }
            }
            catch (Exception e)
            {
                _response.Message = $"can not get notification booking" + e.Message;
                _response.Success = false;
                return _response;
            }

        }
    }
    }

