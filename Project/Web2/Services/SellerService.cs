using AutoMapper;
using Web2.DTOs;
using Web2.Interfaces;
using Web2.Interfaces.IServices;
using Web2.Models;

namespace Web2.Services
{
    public class SellerService : ISellerService
    {
        IUnitOfWork _unitOfWork;
        IMapper _mapper;

        public SellerService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task AddProduct(CreateProductDTO product, int userId)
        {
            var prod = _mapper.Map<Product>(product);
            if ((await _unitOfWork.Users.Get(x => x.Id == userId)) == null)
                throw new Exception("Error with id in token. Logout and login again");

            prod.SellerId = userId;
            if (product.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    product.ImageFile.CopyTo(ms);
                    prod.Image = ms.ToArray();
                }
            }
            await _unitOfWork.Products.Insert(prod);
            await _unitOfWork.Save();
        }

        public async Task DeleteProduct(int id, int userId)
        {
            var user = await _unitOfWork.Users.Get(x => x.Id == userId, new List<string> { "Products" }) ?? throw new Exception("Error with id in token. Logout and login again");

            var product = user.Products!.Find(x => x.Id == id) ?? throw new Exception("This product isn't yours");

            _unitOfWork.Products.Delete(product);
            await _unitOfWork.Save();
        }

        public async Task<List<OrderDTO>> GetNewOrders(int userId)
        {
            var user = await _unitOfWork.Users.Get(x => x.Id == userId, new List<string> { "Products" }) ?? throw new Exception("Error with id in token. Logout and login again");
            var orders = await _unitOfWork.Orders.GetAll(x => !x.IsCancelled && x.DeliveryTime > DateTime.Now, null, new List<string> { "Items" });
            var productIds = user.Products!.Select(x => x.Id);
            if (orders != null)
                orders = orders.ToList().FindAll(x => x.Items!.Any(x => productIds.Contains(x.ProductId)) && !x.IsCancelled);

            foreach (var order in orders!)
                order.Items = order.Items!.FindAll(x => productIds.Contains(x.ProductId));

            return _mapper.Map<List<OrderDTO>>(orders!.OrderByDescending(x => x.OrderTime));
        }

        public async Task<List<OrderDTO>> GetOrders(int userId)
        {
            var user = await _unitOfWork.Users.Get(x => x.Id == userId, new List<string> { "Products" }) ?? throw new Exception("Error with id in token. Logout and login again");

            var orders = await _unitOfWork.Orders.GetAll(null, null, new List<string> { "Items" });
            var productIds = user.Products!.Select(x => x.Id);
            if (orders != null)
                orders = orders.ToList().FindAll(x => x.Items!.Any(x => productIds.Contains(x.ProductId)));

            foreach (var order in orders!)
                order.Items = order.Items!.FindAll(x => productIds.Contains(x.ProductId));

            return _mapper.Map<List<OrderDTO>>(orders!.OrderByDescending(x => x.OrderTime));
        }

        public Task<ProductDTO> GetProduct(int id, int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ProductDTO>> GetProducts(int userId)
        {
            var user = await _unitOfWork.Users.Get(x => x.Id == userId, new List<string> { "Products" }) ?? throw new Exception("Error with id in token. Logout and login again");
            return _mapper.Map<List<ProductDTO>>(user.Products!);
        }

        public async Task UpdateProduct(int id, ProductDTO product, int userId)
        {
            var user = await _unitOfWork.Users.Get(x => x.Id == userId, new List<string> { "Products" }) ?? throw new Exception("Error with id in token. Logout and login again");
            var prod = user.Products!.Find(x => x.Id == id) ?? throw new Exception("This product doesn't belong to you");

            prod.Amount = product.Amount;
            prod.Name = product.Name;
            prod.Description = product.Description;
            prod.Price = product.Price;
            if (product.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    product.ImageFile.CopyTo(ms);
                    prod.Image = ms.ToArray();
                }
            }

            _unitOfWork.Products.Update(prod);
            await _unitOfWork.Save();
        }
    }
}
