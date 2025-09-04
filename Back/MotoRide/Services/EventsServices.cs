using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;
using static System.Net.Mime.MediaTypeNames;

namespace MotoRide.Services
{
    public class EventsServices : IEventsServices
    {
        private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _response;
        private readonly ImageServices _imageServices;

        public EventsServices(MotoRideDbContext context, ServiceResponse response, ImageServices imageServices)
        {
            _context = context;
            _response = response;
            _imageServices = imageServices;
        }
        public async Task<ServiceResponse> AddEvent(AddEventDto dto)
        {
            try
            {



                Event m = new Event()
                {
                    Title = dto.Title,
                    Description = dto.Description,
                    MaxParticipaion = dto.MaxParticipaion,
                    EndRouts = dto.EndRouts,
                    startRouts = dto.startRouts,
                    Duration = dto.Duration,
                    price = dto.price,
                    Time = dto.Time,
                    HaveTrollyProvider=dto.HaveTrollyProvider,
                    EventType = dto.EventType,
                    CreatAt = DateTime.Now,
                };
                await _context.Events.AddAsync(m);
                await _context.SaveChangesAsync();
                _response.Message = "done to add new Event";
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = $"can not add new Event" + e.Message;
                _response.Success = false;
            }
            return _response;

        }

        public async Task<ServiceResponse> AddResponseEventFromGoverments(AddResponseEventFromGovermentDto dto)
        {
            try
            {

                var eventToUpdate = await _context.Events.FirstOrDefaultAsync(x => x.Id == dto.Id);
                if (eventToUpdate == null)
                {
                    _response.Message = $"can not get this {dto.Id} Event";
                    _response.Success = false;
                    return _response;
                }
                else
                {
                    eventToUpdate.IsApproved = dto.IsApproved;
               


                    _context.Events.Update(eventToUpdate);
                    await _context.SaveChangesAsync();
                    _response.Message = "done to add new Event";
                    _response.Success = true;
                }

            }
            catch (Exception e)
            {
                _response.Message = $"can not add new Event" + e.Message;
                _response.Success = false;
            }
            return _response;

        }
        public async Task<ServiceResponse> SendEventToGoverments(int id)
        {
            try
            {

                var eventToUpdate = await _context.Events.FirstOrDefaultAsync(x => x.Id == id);
                if (eventToUpdate == null)
                {
                    _response.Message = $"can not get this {id} Event";
                    _response.Success = false;
                    return _response;
                }
                else
                {
                    eventToUpdate.SendToGoverment = true;


                    _context.Events.Update(eventToUpdate);
                    await _context.SaveChangesAsync();
                    _response.Message = "done to add new Event";
                    _response.Success = true;
                }

            }
            catch (Exception e)
            {
                _response.Message = $"can not add new Event" + e.Message;
                _response.Success = false;
            }
            return _response;

        }

        public async Task<ServiceResponse> GetAllAcceptResponseEventFromGoverments()
        {
            try
            {
                var events = await _context.Events.Where(x => x.SendToGoverment == true && x.IsApproved == true).ToListAsync();

                if (events != null)
                {
                    _response.Data = events;
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

        public async Task<ServiceResponse> GetAllEventDoesNotSendToGoverments()
        {
            try
            {
                var events = await _context.Events.Where(x => x.SendToGoverment == null).ToListAsync();

                if (events != null)
                {
                    _response.Data = events;
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

        public async Task<ServiceResponse> GetAllOldEvents()

        {
            try
            {
                var events = await _context.Events.Where(x=>x.Time.Value< DateTime.UtcNow && x.SendToGoverment == true).ToListAsync();

                if (events != null)
                {
                    _response.Data = events;
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
        public async Task<ServiceResponse> GetAllNewEvents()

        {
            try
            {
                var events = await _context.Events.Where(x => x.Time.Value >= DateTime.Now &&  x.SendToGoverment == true).ToListAsync();

                if (events.Count!=0)
                {
                    _response.Data = events;
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
        public async Task<ServiceResponse> GetAllRejectResponseEventFromGoverments()
        {

            try
            {
                var events = await _context.Events.Where(x => x.SendToGoverment == true && x.IsApproved == false).ToListAsync();

                if (events != null)
                {
                    _response.Data = events;
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
        public async Task<ServiceResponse> GetAllEventWaitResponseFromGoverments()
        {
            try
            {
                var events = await _context.Events.Where(x => x.SendToGoverment == true && x.IsApproved == null).ToListAsync();

                if (events != null)
                {
                    _response.Data = events;
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
        public async Task<ServiceResponse> GetEventById(int eventId)
        {
            try
            {
                var events = await _context.Events.Where(x => x.Id==eventId).ToListAsync();

                if (events != null)
                {
                    _response.Data = events;
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
        public async Task<ServiceResponse> JoinEvents(TiketsDto dto)
        {
            try
            {

                var events = await _context.Events.FirstOrDefaultAsync(x => x.Id == dto.EventId);
                int? numbertoJion = dto.NumberOfGuest + 1;
                if (events.MaxParticipaion <= 0 && events.MaxParticipaion - numbertoJion <= 0)
                {
                    _response.Message = "can not add new Event";
                    _response.Success = false;
                }
                else
                {
                    Ticket t = new Ticket()
                    {
                        UserId = dto.UserId,
                        EventId = dto.EventId,
                        NumberOfGuest = dto.NumberOfGuest,
                        CreateAt = DateTime.Now,

                    };
                    await _context.Tickets.AddAsync(t);
               
                    events.MaxParticipaion -=  numbertoJion;
                    _context.Events.Update(events);
                    await _context.SaveChangesAsync();
                    _response.Message = "done to add new user to events";
                    _response.Success = true;

                }


            }
            catch (Exception e)
            {
                _response.Message = $"can not add new Event" + e.Message;
                _response.Success = false;
            }
            return _response;

        }
        /*     public async Task<ServiceResponse> DisJoinEvents(int id)
             {
                 try
                 {

                     var events = await _context.Events.FirstOrDefaultAsync(x => x.Id == id);
                     int? numbertoJion = dto.NumberOfGuest + 1;
                     if (events.MaxParticipaion <= 0 && events.MaxParticipaion - numbertoJion <= 0)
                     {
                         _response.Message = "can not add new Event";
                         _response.Success = false;
                     }
                     else
                     {
                         Ticket t = new Ticket()
                         {
                             UserId = dto.UserId,
                             EventId = dto.EventId,
                             NumberOfGuest = dto.NumberOfGuest,
                             CreateAt = DateTime.Now,

                         };
                         await _context.Tickets.AddAsync(t);
                         await _context.SaveChangesAsync();
                         events.MaxParticipaion = events.MaxParticipaion - numbertoJion;
                         _context.Events.Update(events);
                         await _context.SaveChangesAsync();
                         _response.Message = "done to add new user to events";
                         _response.Success = true;

                     }


                 }
                 catch (Exception e)
                 {
                     _response.Message = $"can not add new Event" + e.Message;
                     _response.Success = false;
                 }
                 return _response;

             }*/

        public async Task<ServiceResponse> GetAllUserJoinEvents(int id)
        {
            {
                try
                {
                    var events = await _context.Tickets.Where(x => x.EventId == id).Include(x => x.User).ToListAsync();

                    if (events != null)
                    {
                        _response.Data =new { events ,count=events.Count()+events.Sum(x=>x.NumberOfGuest)};
                     
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

    }
}