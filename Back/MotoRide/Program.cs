using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using MotoRide.IServices;
using MotoRide.Models;
using MotoRide.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpContextAccessor();
// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler =
                ReferenceHandler.IgnoreCycles);
builder.Services.AddSwaggerGen(c =>
{
    // Add JWT Bearer Authentication
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer", // Use "bearer" scheme for JWT
        BearerFormat = "JWT", // Optional, just indicates it's a JWT token
        In = ParameterLocation.Header,
        Description = "Enter your JWT token in the format: 'Bearer {your_token}'"
    });

    // Add security requirement to the API to require the Bearer token for specific endpoints
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});



builder.Services.AddDbContext<MotoRideDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAuthenticationServices, AuthenticationServices>();
builder.Services.AddScoped<IProductSerives, ProductSerives>();
builder.Services.AddScoped<IOrderServices, OrderServices>();
builder.Services.AddScoped<IMotocyleService, MotocyleService>();
builder.Services.AddScoped<ICartItemServices, CartItemServices>();
builder.Services.AddScoped<ICartServices, CartServices>();
builder.Services.AddScoped<ICategoryProductServices, CategoryProductServices>();
builder.Services.AddScoped<IBookingServices, BookingServices>();
builder.Services.AddScoped<IMaintanceServices, MaintanceServices>(); 
builder.Services.AddScoped<ICategoryMaintenancesServices, CategoryMaintenancesServices>();
builder.Services.AddScoped<ImageServices>();
builder.Services.AddScoped<ICustomerServices, CustomerServices>();
builder.Services.AddScoped<IReviewServices, ReviewServices>();
builder.Services.AddScoped<IWishListServices, WishListServices>();
builder.Services.AddScoped<IEventsServices, EventsServices>();
builder.Services.AddScoped<IAdminServices, AdminServices>();
builder.Services.AddScoped<IReviewMaintenanceServies, ReviewMaintenanceServies>();
builder.Services.AddScoped<IStoreServices, StoreServices>();
builder.Services.AddScoped<INotificationBookingMaintenanceServices, NotificationBookingMaintenanceServices>();
builder.Services.AddScoped<ServiceResponse>();
// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});
builder.Services.AddRazorPages();
builder.Services.AddControllers();

// تمكين الـ Session
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // تحديد مدة انتهاء الجلسة
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;  // لضمان أن الكوكيز يتم إرسالها في الطلبات
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapControllers();



app.UseSession();


// Use CORS
app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Images")), // Point to your custom folder
    RequestPath = "/Images"  // URL path to access the images
});


app.Run();
