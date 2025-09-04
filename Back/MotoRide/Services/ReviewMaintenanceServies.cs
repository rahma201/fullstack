using INTEGRATEDAPI.Shared;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;
using Microsoft.EntityFrameworkCore;
using Azure;
using MotoRide.Migrations;
using Azure.Core;

namespace MotoRide.Services
{
    public class ReviewMaintenanceServies : IReviewMaintenanceServies
    {
        private readonly MotoRideDbContext _context;

        public ReviewMaintenanceServies(MotoRideDbContext dbContext)
        {
            _context = dbContext;
        }


        public async Task<ServiceResponse> GetReviewMaintenance(int reviewMaintenanceId)
        {
            {
                var response = new ServiceResponse();

                try
                {
                    var review = await _context.ReviewMaintenances
                        .Include(r => r.Customer)
                        .Include(r => r.Maintenance)
                        .Where(r => r.ReviewMaintenanceId == reviewMaintenanceId).ToListAsync();

                    if (review == null)
                    {
                        response.Success = false;
                        response.Message = "ReviewMaintenances not found.";
                        return response;
                    }

                    response.Success = true;
                    response.Message = "ReviewMaintenances retrieved successfully.";
                    response.Data = review;
                }
                catch (Exception ex)
                {
                    response.Success = false;
                    response.Message = ex.Message;
                }

                return response;
            }
        }

        public async Task<ServiceResponse> AddReviewMaintenance(AddReviewMaintenanceDto dto)
        {
            var response = new ServiceResponse();

            try
            {
                ReviewMaintenance review = new ReviewMaintenance();
                review.Comment = dto.Comment;
                review.Rating = dto.Rating;
                review.CustomerId = dto.CustomerId;
                review.CreatedAt =  DateTime.UtcNow;
                review.IsActive = true;
                review.MaintenanceId = dto.MaintenanceId;
                await _context.ReviewMaintenances.AddAsync(review);
                await _context.SaveChangesAsync();
                response.Success = true;
                response.Message = "Review Maintenance added successfully!";
                response.Data = review;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }
    
        public async Task<ServiceResponse> DeleteReviewMaintenanceByMaintenance(DeleteReviewMaintenanceByMaintenanceDto dto)
        {
            var response = new ServiceResponse();

            try
            {
                var review = await _context.ReviewMaintenances
        .Where(r => r.ReviewMaintenanceId == dto.ReviewMaintenanceId)// Assuming shopId maps to product/motorcycle
                    .FirstOrDefaultAsync();

                if (review != null)
                {
                    review.MaintenanceNeedDeletedReview = dto.MaintenanceNeedDeletedReview;
                    review.MaintenanceReason = dto.MaintenanceReason;
                    _context.ReviewMaintenances.Update(review);
                    await _context.SaveChangesAsync();
                    response.Success = true;
                    response.Message = "ReviewMaintenances retrieved successfully.";
                    response.Data = review;

                }
                else
                {
                    response.Success = false;
                    response.Message = "No ReviewMaintenances found for this Maintenances.";
                    return response;

                }


            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse> DeleteReviewMaintenanceByAdmain(DeleteReviewMaintenanceByAdmainDto dto)
        {
            {
                var response = new ServiceResponse();

                try
                {
                    var review = await _context.ReviewMaintenances
            .Where(r => r.ReviewMaintenanceId == dto.ReviewMaintenanceId)// Assuming shopId maps to product/motorcycle
                        .FirstOrDefaultAsync();

                    if (review != null)
                    {
                        review.AdminNeedDeletedReview = true;
                        if (dto.AdminNeedDeletedReview == true)
                        {

                            review.IsActive = false; // Soft delete (instead of removing from DB)

                        }
                        _context.ReviewMaintenances.Update(review);
                        await _context.SaveChangesAsync();
                        response.Success = true;
                        response.Message = "Reviews retrieved successfully.";
                        response.Data = review;
                    }
                    else
                    {
                        response.Success = false;
                        response.Message = "No reviews found for this shop.";
                        return response;

                    }


                }
                catch (Exception ex)
                {
                    response.Success = false;
                    response.Message = ex.Message;
                }

                return response;
            }
        }

        public async Task<ServiceResponse> GetDeleteReviewMaintenance(GetDeleteReviewMaintenanceDto dto)
        {
            {
                var response = new ServiceResponse();

                try
                {
                    var review = await _context.ReviewMaintenances
            .Where(r => r.ReviewMaintenanceId == dto.ReviewMaintenanceId && r.MaintenanceId == dto.MaintenanceId&& r.IsActive == false)// Assuming shopId maps to product/motorcycle
                 .Select(r => new 
                 {
                      r.Rating,
                    r.ReviewMaintenanceId,
                   r.Comment,
                     r.MaintenanceId,
                      r.AdminNeedDeletedReview,
                      r.CustomerId,
                    
                    r.MaintenanceNeedDeletedReview,
                 r.MaintenanceReason,
          r.IsActive,

                 })
                        .FirstOrDefaultAsync();

                    if (review != null)
                    {

                        response.Success = true;
                        response.Message = "Reviews retrieved successfully.";
                        response.Data = review;
                    }
                    else
                    {
                        response.Success = false;
                        response.Message = "No reviews found for this shop.";
                        return response;

                    }


                }
                catch (Exception ex)
                {
                    response.Success = false;
                    response.Message = ex.Message;
                }

                return response;
            }
        }

        public async Task<ServiceResponse> GetDeleteReviewMaintenancebyAdmain()
        {
            var response = new ServiceResponse();
            try
            {
                var reviews = await _context.ReviewMaintenances
                    .Where(r => r.IsActive != false && r.MaintenanceNeedDeletedReview == true && r.AdminNeedDeletedReview != true)
                    .Include(x => x.Customer)
                    .Include(x => x.Maintenance)

                    .ToListAsync();

                if (reviews == null || !reviews.Any())
                {
                    response.Success = false;
                    response.Message = "No reviews found.";
                    return response;
                }


                else
                {
                    response.Success = true;
                    response.Message = "Reviews retrieved successfully.";
                    response.Data = reviews;
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}

