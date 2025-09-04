using MotoRide.Models;

namespace MotoRide.Dto
{
    public class AddWishListDto
    {
        public int? ProductId { get; set; }

        public int? MotorcycleId { get; set; }
        public int? CustomerId { get; set; }

   


    }
    public class UpateWishListDto
    {
        public int WishListId { get; set; }

        public int? ProductId { get; set; }

        public int? MotorcycleId { get; set; }
        public int? CustomerId { get; set; }


    }

}
