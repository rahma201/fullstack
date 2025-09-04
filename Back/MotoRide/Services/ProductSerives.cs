using INTEGRATEDAPI.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.IdentityModel.Tokens;
using MotoRide.Dto;
using MotoRide.IServices;
using MotoRide.Models;
using static System.Net.Mime.MediaTypeNames;

namespace MotoRide.Services
{
    public class ProductSerives : IProductSerives
    {
      private readonly MotoRideDbContext _context;
        private readonly ServiceResponse _response;
        private readonly ImageServices _imageServices;
        public ProductSerives(MotoRideDbContext context, ServiceResponse response, ImageServices imageServices)
        {
            _context = context;
            _response = response;
            _imageServices = imageServices;
        }
        public async Task<ServiceResponse> GetAllProduct(int storeId)
        {
            try
            {
                var product = from p in await _context.Products
                              .Where(x => x.IsActive != false&&x.StoreId==storeId)
                              .ToListAsync()
                              select new CardProductDto
                              {
                                  ProductId = p.ProductId,
                                  Name = p.Name,
                                  Images = $"http://localhost:5147{p.Images}",
                                  Price = p.Price,
                              };
                if (product == null)
                {
                    _response.Message = "can not get all product";
                    _response.Success = false;
                }
                _response.Data = product;
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = "can not get all product" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> GetAllProduct()
        {
            try
            {
                var product = from p in await _context.Products
                              .Where(x=>x.IsActive!= false)
                              .ToListAsync()
                              select new CardProductDto
                              {
                                  ProductId = p.ProductId,
                                  Name = p.Name,
                                  Images = $"http://localhost:5147{p.Images}",
                                  Price = p.Price,
                              };
                if (product == null)
                {
                    _response.Message = "can not get all product";
                    _response.Success= false;
                }
                _response.Data = product;
                _response.Success = true;

            } 
            catch(Exception e)
            {
                _response.Message = "can not get all product"+e.Message;
                _response.Success = false;
            }    
            return _response;
        }
        public async Task<ServiceResponse> GetProduct(int productId)
        {
            try
            {
                var product =await _context.Products.FirstOrDefaultAsync(x=>x.ProductId == productId);
                if (product == null)
                {
                    _response.Message = $"can not get this {productId} product";
                    _response.Success = false;
                }
                var productjson = new
                {
                    Colors = product.Colors,
                    ProductId = product.ProductId,
                    Name = product.Name,
                    Description = product.Description,
                    Sizes = product.Sizes,
                    Images = $"http://localhost:5147{product.Images}",
                    Price = product.Price,
                    ShopOwnerId = product.StoreId,
                    CategoryProductId = product.CategoryProductId,
                    Quantity = product.Quantity,
                };

                _response.Data = productjson;
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = $"can not get this {productId} product" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> GetProductbyCategory(int categoryId)
        {
            try
            {
                var products = from p in _context.Products.Where(x => x.CategoryProductId == categoryId && x.IsActive != false)
                                              select new CardProductDto
                                              {
                                                  ProductId = p.ProductId,
                                                  Name = p.Name,
                                                  Images = $"http://localhost:5147{p.Images}",
                                                  Price = p.Price,
                                              };
                if (products == null)
                {
                    _response.Message = $"can not get  product in this category{categoryId}";
                    _response.Success = false;
                }
                _response.Data = products;
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = $"can not get product in this category{categoryId}" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> AddProduct(AddProductDto dto, IFormFile? productImageFile)
        {
            try
            {
                string? productImagePath = null;

                // Check if a product image file is provided
                if (productImageFile != null)
                {
                    // Save the image and get its path
                    productImagePath = await _imageServices.Imges(productImageFile);
                }

                Product p = new Product()
                {
                    Price = dto.Price,
                    Quantity = dto.Quantity,
                    Sizes = dto.Sizes,
                    CategoryProductId = dto.CategoryProductId,
                    Colors = dto.Colors,
                    Name = dto.Name,
                    RemainingQuantity = dto.Quantity,
                    Images = productImagePath,
                    Description = dto.Description,
                    StoreId = dto.StoreId,
                    CreatedAt = DateTime.Now,
                };
                await _context.Products.AddAsync(p);
                await _context.SaveChangesAsync();
                _response.Message = "done to add new product";
                _response.Success = true;
            }
            catch (Exception e)
            {
                _response.Message = "can not add new product" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> UpdateProduct(UpdateProductDto dto, IFormFile? productImageFile)
        {
            try
            {
                string? productImagePath = null;

                // Check if a product image file is provided
                if (productImageFile != null)
                {
                    // Save the image and get its path
                    productImagePath = await _imageServices.Imges(productImageFile);
                }

                var product = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == dto.ProductId);
                if (product == null)
                {
                    _response.Message = $"can not get this {dto.ProductId} product";
                    _response.Success = false;
                }
                else { 
                product.Price = dto.Price;
                product.Quantity = dto.Quantity;
                product.Sizes = dto.Sizes;
                product.Colors = dto.Colors;
                product.Name = dto.Name;
                    product.CategoryProductId = dto.CategoryProductId;
                    product.ProductId = dto.ProductId;
                  if(productImagePath!=null)
                product.Images = productImagePath;
                    product.RemainingQuantity = dto.Quantity;

                product.Description = dto.Description;
             
                 _context.Products.Update(product);
                await _context.SaveChangesAsync();
                _response.Message = $"done to update this {dto.ProductId} product";
                _response.Success = true;
                }

            }
            catch (Exception e)
            {
                _response.Message = $"can not update this {dto.ProductId} product" + e.Message;
                _response.Success = false;
            }
            return _response;
        }
        public async Task<ServiceResponse> DeleteProduct(int productId)
        {
            try
            {
                var product = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == productId);
                if (product == null)
                {
                    _response.Message = $"can not delete this {productId} product";

                    _response.Success = false;
                    return _response;

                }
                product.IsActive = false;
                _context.Update(product);
                await _context.SaveChangesAsync();
                _response.Success = true;
                _response.Message = $"  delete this {productId} product succefully";
           
            }
            catch (Exception e)
            {
                _response.Message = $"can not delete this {productId} product" + e.Message;
                _response.Success = false;
            }
            return _response;
        }

        public async Task<ServiceResponse> GetProductByShop(int shopId)
        {
            try
            {
                var products =  from p in 
                  _context.Products.Where(x => x.StoreId == shopId&&x.IsActive!= false)
                   select new CardProductDto
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                       Images = $"http://localhost:5147{p.Images}",
                       Price = p.Price,
                    Quantity = p.Quantity,
                       RemainingQuantity= p.RemainingQuantity
                }; ;
                if (products == null)
                {
                    _response.Message = $"can not get  product in  this {shopId} shop ";
                    _response.Success = false;
                }
                _response.Data = products;
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = $"can not get  product in  this {shopId} shop " + e.Message;
                _response.Success = false;
            }
            return _response;
        }

        public async Task<ServiceResponse> SearchProduct(string name)
        {
            {
                try
                {
                    var product = from p in await _context.Products
                                  .Where(x => x.IsActive != false && (x.Name.ToLower().Contains(name.ToLower())|| x.Description.ToLower().Contains(name.ToLower())))
                                  .ToListAsync()
                                  select new CardProductDto
                                  {
                                      ProductId = p.ProductId,
                                      Name = p.Name,
                                      Images = $"http://localhost:5147{p.Images}",
                                      Price = p.Price,
                                  };
                    if (product == null)
                    {
                        _response.Message = "can not get any product";
                        _response.Success = false;
                    }
                    _response.Data = product;
                    _response.Success = true;

                }
                catch (Exception e)
                {
                    _response.Message = "can not get all product" + e.Message;
                    _response.Success = false;
                }
                return _response;
            }
        }
        public async Task<ServiceResponse> MostPopularityProduct()
        {
            try
            {
                var response = new ServiceResponse();

                var product = await _context.OrderItems.Include(x => x.Product).
                    GroupBy(x => x.ProductId)
                    .Select(x => new {
                        x.First().ProductId,
                        x.First().Product.Name,
                        x.First().Image,
                        OrderCount = x.Count()
                    }).ToListAsync();



                if (product == null)
                {
                    _response.Message = "can not get any Motorcycles";
                    _response.Success = false;
                }
                _response.Data = product.OrderByDescending(x => x.OrderCount).FirstOrDefault();
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = "can not get all Motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }

        public async Task<ServiceResponse> FilteringProduct(int shopId,string? sortBy, string? color, decimal? startPrice, decimal? EndPrice)
        {
            var response = new ServiceResponse();

            try
            {
                var query = _context.Products.Where(x=>x.StoreId== shopId).AsQueryable();

                if (!string.IsNullOrEmpty(color))
                {
                    query = query.Where(m => m.Colors == color);
                }

                if (startPrice != null || EndPrice != null)
                {
                    if (startPrice == null) startPrice = 0;
                    if (EndPrice == null) EndPrice = decimal.MaxValue;

                    query = query.Where(m => m.Price >= startPrice && m.Price <= EndPrice);
                }

                if (!string.IsNullOrEmpty(sortBy))
                {
                    sortBy = sortBy.ToLower();

                    if (sortBy == "price_desc") query = query.OrderByDescending(m => m.Price);
                    else if (sortBy == "price_all") query = query;
                    else if (sortBy == "price_asc") query = query.OrderBy(m => m.Price);
                    else
                    {   if (sortBy == "default") query = query;
                        else if(sortBy == "newness") query = query.OrderByDescending(m => m.CreatedAt);
                        else if (sortBy == "popularity")
                        {
                            var query2 = await _context.OrderItems
                                .Include(x => x.Product)
                                .GroupBy(x => x.ProductId)
                                .Select(x => new
                                {
                                    ProductId = x.Key,
                                    ProductName = x.First().Product.Name,
                                    Image = x.First().Image,
                                    OrderCount = x.Count()
                                }).ToListAsync();

                            response.Data = query2;
                            response.Success = true;
                            return response;
                        }
                    }
                }

                var result = await query.ToListAsync();
                response.Data = result;
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse> TopMostPopularityProduct()
        {
            try
            {
                var response = new ServiceResponse();

                var product = await _context.OrderItems.Where(x=>x.Product.IsActive!=false&&x.ProductId!=null).Include(x => x.Product).
                    GroupBy(x => x.ProductId)
                    .Select(x => new {
                        x.First().ProductId,
                        x.First().Product.Name,
                        x.First().Image,
                        x.First().Price,
                        OrderCount = x.Count()
                    }).ToListAsync();



                if (product == null)
                {
                    _response.Message = "can not get any Motorcycles";
                    _response.Success = false;
                }
                _response.Data = product.OrderByDescending(x => x.OrderCount).Take(20);
                _response.Success = true;

            }
            catch (Exception e)
            {
                _response.Message = "can not get all Motorcycle" + e.Message;
                _response.Success = false;
            }
            return _response;
        }

    }
}
