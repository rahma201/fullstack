namespace MotoRide.Models
{
    public class ShopOwnerOders:Base
    {
        public int ShopOwnerOdersId { get; set; }
        public int? OrderId { get; set; }
        public Order? Order { get; set; }
        public int? ShopOwnerId { get; set; }
        public ShopOwner? ShopOwner { get; set; }

    }
}
