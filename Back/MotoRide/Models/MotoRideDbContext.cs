using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;

namespace MotoRide.Models
{
    public class MotoRideDbContext: DbContext
    {
        public MotoRideDbContext() { }

        public MotoRideDbContext(DbContextOptions<MotoRideDbContext> options) :base(options){ }

        public  void modelBuilder(ModelBuilder modelBuilder)
        {

          
            #region ShopOwner
            modelBuilder.Entity<Store>().HasKey(u => u.StoreId);
            modelBuilder.Entity<Store>().Property(u => u.StoreId).UseIdentityColumn();
            modelBuilder.Entity<Store>().Property(u => u.StoreName).IsUnicode(true);
            #endregion
            #region Motorcycle
            modelBuilder.Entity<Motorcycle>().HasKey(u => u.MotorcycleId);
            modelBuilder.Entity<Motorcycle>().Property(u => u.MotorcycleId).UseIdentityColumn();
            modelBuilder.Entity<Motorcycle>().Property(x => x.Colors)
         .HasConversion(new ValueConverter<List<string>, string>(
             v => JsonConvert.SerializeObject(v), // Convert to string for persistence
             v => JsonConvert.DeserializeObject<List<string>>(v)));

            modelBuilder.Entity<Motorcycle>()
              .Property(x => x.Images)
        .HasConversion(new ValueConverter<List<string>, string>(
            v => JsonConvert.SerializeObject(v), // Convert to string for persistence
            v => JsonConvert.DeserializeObject<List<string>>(v)));
            #endregion
            #region Cart
            modelBuilder.Entity<Cart>().HasKey(u => u.CartId );
            modelBuilder.Entity<Cart>().Property(u => u.CartId).UseIdentityColumn();
            #endregion
            #region CartItem
            modelBuilder.Entity<CartItem>().HasKey(u => u.CartItemId);
            modelBuilder.Entity<CartItem>().Property(u => u.CartItemId).UseIdentityColumn();
            #endregion
          
            #region Order
            modelBuilder.Entity<Order>().HasKey(u => u.OrderId);
            modelBuilder.Entity<Order>().Property(u => u.OrderId).UseIdentityColumn();
            #endregion
        
            #region Product
            modelBuilder.Entity<Product>().HasKey(u => u.ProductId);
            modelBuilder.Entity<Product>().Property(u => u.ProductId).UseIdentityColumn();
            modelBuilder.Entity<Product>()
         .Property(x => x.Colors)
         .HasConversion(new ValueConverter<List<string>, string>(
             v => JsonConvert.SerializeObject(v), // Convert to string for persistence
             v => JsonConvert.DeserializeObject<List<string>>(v)));
            modelBuilder.Entity<Product>()
     .Property(x => x.Sizes)
     .HasConversion(new ValueConverter<List<string>, string>(
         v => JsonConvert.SerializeObject(v), // Convert to string for persistence
         v => JsonConvert.DeserializeObject<List<string>>(v)));
            modelBuilder.Entity<Product>()
        .Property(x => x.Images)
        .HasConversion(new ValueConverter<List<string>, string>(
            v => JsonConvert.SerializeObject(v), // Convert to string for persistence
            v => JsonConvert.DeserializeObject<List<string>>(v)));


            #endregion
            #region reivew
            modelBuilder.Entity<Review>().HasKey(u => u.ReviewId);
            modelBuilder.Entity<Review>().Property(u => u.ReviewId).UseIdentityColumn();
            #endregion
            #region WishList
            modelBuilder.Entity<WishList>().HasKey(u => u.WishListId);
            modelBuilder.Entity<WishList>().Property(u => u.WishListId).UseIdentityColumn();
            #endregion

            modelBuilder.Entity<Maintenance>()
       .HasMany(m => m.Categories)
       .WithMany(c => c.Maintenance)
       .UsingEntity(j => j.ToTable("MaintenanceCategories")); // اسم الجدول الوسيط
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Motorcycle> Motorcycles {  get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<CategoryMaintenance> CategoryMaintenances { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<CategoryProduct> CategoryProducts { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<WishList> WishLists { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Maintenance> Maintenances { get; set; }
        public DbSet<WorkHours> WorkHours { get; set; }
        public DbSet<NotificationBookingMaintenance> NotificationBookingMaintenances { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<ReviewMaintenance> ReviewMaintenances { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

    }
}
