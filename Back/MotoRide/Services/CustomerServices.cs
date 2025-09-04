using Azure;
using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;
using static MotoRide.Helper.Enum;

namespace MotoRide.Services
{
    public class CustomerServices:ICustomerServices

    {
        private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _response;
        public CustomerServices(MotoRideDbContext context,ServiceResponse response)
        {
            _context = context;
            _response = response;
        }
        private async Task<ServiceResponse> UpdateUserLevel(int userId)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(userId);
                if (customer == null)
                {
                    _response.Success = false;
                    _response.Message = "User Not Found";
                }

                if (customer.Points >= 1000)
                    customer.Level = UserLevel.VIP;
                else if (customer.Points >= 500)
                    customer.Level = UserLevel.Pro;
                else
                    customer.Level = UserLevel.Basic;

                _context.Customers.Update(customer);
                await _context.SaveChangesAsync();
                return _response;
            }
            catch (Exception e)
            {
                _response.Success = false;
                _response.Message = $"can not Update User{e.Message}";
                return _response;
            }
        }
        public async Task<ServiceResponse> AddPoints(int userId, int points)
        {
            try
            {
                var user = await _context.Customers.FindAsync(userId);
                if (user == null)
                {
                    _response.Success = false;
                    _response.Message = "User Not Found";
                }

                user.Points += points;
                await UpdateUserLevel(userId);
                await _context.SaveChangesAsync();
                _response.Success = true;
                _response.Message = "Points Added Successfully";
                return _response;
            }
            catch (Exception e)
            {
                _response.Success = false;
                _response.Message = $"can not Add Points{e.Message}";
                return _response;
            }
        }
        public async Task<ServiceResponse> GetLevel(int userId)
        {
            try
            {
                var user = await _context.Customers.FindAsync(userId);
                if (user == null)
                {
                    _response.Success = false;
                    _response.Message = "User Not Found";
                }
                _response.Success = true;
                _response.Data = user.Level.ToString();
                return _response;
            }
            catch (Exception e)
            {
                _response.Success = false;
                _response.Message = $"can not Get Level{e.Message}";
                return _response;
            }
        }
        public async Task<ServiceResponse> UpdateCustomer(UpdateCustomerDto dto)
        {
            var customer = _context.Customers.FirstOrDefault(x => x.CustomerId == dto.Id);
            if (customer == null)
            {
                _response.Success = false;
                _response.Message = "customer not found";
                return _response;
            }
            else
            {
                customer.Email = dto.Email;
                customer.Phone = dto.Phone;
                customer.Username = dto.Username;
                customer.Location = dto.Location;
                customer.Gender = dto.Gender;
                customer.BirthDay = dto.BirthDay;
                 _context.Customers.Update(customer);
                await _context.SaveChangesAsync();


                _response.Success = true;
                _response.Message = "customer found";
                return _response;
            }
        }
        public async Task<ServiceResponse> CountGender()
        {
            try
            {
                var _response = new ServiceResponse();

                var gender = await _context.Customers.GroupBy(x => x.Gender).Select(x => new { x.First().Gender, most = x.Count() }).ToListAsync();


                if (gender == null)
                {
                    _response.Message = "can not get any Motorcycles";
                    _response.Success = false;
                }
                _response.Data = gender;
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = "can not get all Motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> MostAgeUsed()
        {
            var response = new ServiceResponse();

            try
            {
                var ages = await _context.Customers
                    .Select(c => new
                    {
                        Age = EF.Functions.DateDiffYear(c.BirthDay, DateTime.Now)
                    })
                    .ToListAsync();

                if (ages == null || !ages.Any())
                {
                    response.Message = "No customer data found.";
                    response.Success = false;
                    return response;
                }

                var grouped = ages
                    .GroupBy(a => $"{(a.Age / 10) * 10}-{((a.Age / 10) * 10) + 9}")
                    .Select(g => new
                    {
                        AgeRange = g.Key,
                        Count = g.Count()
                    })
                    .OrderByDescending(g => g.Count)
                    .FirstOrDefault();

                if (grouped == null)
                {
                    response.Message = "No age groups found.";
                    response.Success = false;
                }
                else
                {
                    response.Data = grouped;
                    response.Success = true;
                }
            }
            catch (Exception ex)
            {
                response.Message = "Error: " + ex.Message;
                response.Success = false;
            }

            return response;
        }


    }
}
