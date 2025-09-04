
namespace MotoRide.Models
{

    public class Order
    {
        public int OrderId { get; set; }
        public string? Title { get; set; }
        public float? TotalPrice { get; set; }
        public DateTime? Date { get; set; }
        public float? Fee { get; set; }//الرسوم
        public string? CustomerNote { get; set; }
       

        public DateTime? RecivingDate { get; set; }
        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public int? StoreId { get; set; }
        public string? StatusPayment { get; set; }
        public int? PaymentmethodId { get; set; }
        public Paymentmethod? Paymentmethod { get; set; }

        //public bool? PreparingRequest { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsActive { get; set; }

    }
}
