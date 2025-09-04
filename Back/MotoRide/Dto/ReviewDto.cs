using MotoRide.Models;

namespace MotoRide.Dto
{
    public class AddReviewDto
    {
        public string? Name { get; set; }
        public string? Comment { get; set; }
        public int? Rating { get; set; }
        public int? CustomerId { get; set; }
        public int? ProductId { get; set; }
        public int? MotorcycleId { get; set; }
        public int? StoreId { get; set; }

        public DateTime? CreatedAt { get; set; }

    }
    public class AddReviewMaintenanceDto
    {
        public string? Name { get; set; }
        public string? Comment { get; set; }
        public int? Rating { get; set; }
        public int? CustomerId { get; set; }

        public int? MaintenanceId { get; set; }

        public DateTime? CreatedAt { get; set; }

    }
    
    public class UpdateReviewDto
    {
        public int ReviewId { get; set; }
        public string? Name { get; set; }
        public string? Comment { get; set; }
        public int? Rating { get; set; }
        public int? CustomerId { get; set; }
        public int? StoreId { get; set; }
        public int? ProductId { get; set; }
        public int? MotorcycleId { get; set; }
     

    }
    public class DeleteRviewByStoreDto
    {
        public int ReviewId { get; set; }
        public bool? StoreNeedDeletedReview { get; set; }
        public string? StoreReason { get; set; }
    }
    public class DeleteRviewByAdmainDto
    {
        public int ReviewId { get; set; }
        public bool? AdminNeedDeletedReview { get; set; }
        public string? AdminReason { get; set; }
    }
    public class GetDeleteStoreDto
    {
        public int ReviewId { get; set; }
       
        public int? StoreId { get; set; }
        public int? CustomerId { get; set; }
        public int? ProductId { get; set; }
        public int? MotorcycleId { get; set; }



    }
 

    public class GetDeleteDto
    {
        public int ReviewId { get; set; }
        public string? Comment { get; set; }
        public bool? StoreNeedDeletedReview { get; set; }
        public string? StoreReason { get; set; }
        public bool? AdminNeedDeletedReview { get; set; }
        public string? AdminReason { get; set; }
        public int? StoreId { get; set; }
        public int? Rating { get; set; }
        public int? CustomerId { get; set; }
        public int? ProductId { get; set; }
        public int? MotorcycleId { get; set; }

        public bool? IsActive { get; set; }


    }
    public class GetDeletebyAdmainReviewDto
    {
        public int ReviewId { get; set; }
        public string? StoreName { get; set; }
        public string? CreateAt { get; set; }
        public string? UserName { get; set; }
        public string? ItemName { get; set; }
        public string? ItemImage { get; set; }
        public string? Comment { get; set; }
        public bool? StoreNeedDeletedReview { get; set; }
        public string? StoreReason { get; set; }
        public bool? AdminNeedDeletedReview { get; set; }
        public string? AdminReason { get; set; }
        public int? StoreId { get; set; }
        public int? Rating { get; set; }
        public int? CustomerId { get; set; }
        public int? ProductId { get; set; }
        public int? MotorcycleId { get; set; }

        public bool? IsActive { get; set; }
    }
}
public class DeleteReviewMaintenanceByMaintenanceDto
{
    public int ReviewMaintenanceId { get; set; }
    public bool? MaintenanceNeedDeletedReview { get; set; }
    public string? MaintenanceReason { get; set; }
}
public class DeleteReviewMaintenanceByAdmainDto
{
    public int ReviewMaintenanceId { get; set; }
    public bool? AdminNeedDeletedReview { get; set; }
}
public class GetDeleteReviewMaintenanceDto
{
    public int ReviewMaintenanceId { get; set; }

    public int? MaintenanceId { get; set; }
    public int? CustomerId { get; set; }




}



