using Azure;
using INTEGRATEDAPI.Shared;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using MotoRide.IServices;

namespace MotoRide.Services
{

    public class ImageServices
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ImageServices(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<string> Imges(IFormFile file)
        {
            if (file == null)
            {
                return ""; // Return an empty string if no file is uploaded.
            }

            // Generate a unique filename
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);

            // Get the absolute path dynamically
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images");

            // Ensure the directory exists
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var filePath = Path.Combine(uploadFolder, fileName);

            // Save file to the directory
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return relative path for the frontend
            return $"/Images/{fileName}";
        }
    }
    }
