using System.ComponentModel.DataAnnotations;
using static MotoRide.Helper.Enum;

namespace MotoRide.Models
{
    public class Paymentmethod
    {
        public int Id { get; set; }

        // فقط إذا كنتي بتستخدمي الدفع بالبطاقة
        public string? CardNumber { get; set; }
        public string? Code { get; set; }
        public string? CardHolder { get; set; }
        public DateTime? ExpireDate { get; set; }

        public float? Balance { get; set; }

        public PaymentMethod Method { get; set; } // Enum
        public bool IsActive { get; set; } = true;
    }

    public enum PaymentMethod
    {
        Cash,
        CreditCard,
        Wallet
    }
}
