using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Web2.DTOs;
using Web2.Interfaces.IServices;

namespace Web2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController : ControllerBase
    {

        ISellerService _sellerService;

        public SellerController(ISellerService sellerService)
        {
            _sellerService = sellerService;
        }


        [Authorize(Roles = "Seller")]
        [HttpGet("products")]
        public async Task<IActionResult> GetProducts()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int id))
                throw new Exception("Bad ID. Logout and login.");

            var products = await _sellerService.GetProducts(id);
            return Ok(products);
        }

        [Authorize(Roles = "Seller")]
        [HttpPost("products")]
        public async Task<IActionResult> AddProduct([FromForm] CreateProductDTO productDTO)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Bad ID. Logout and login.");

            await _sellerService.AddProduct(productDTO, userId);
            return Ok();
        }

        [Authorize(Roles = "Seller")]
        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromForm] ProductDTO productDTO)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Bad ID. Logout and login.");

            await _sellerService.UpdateProduct(productDTO.Id, productDTO, userId);
            return Ok();
        }

        [Authorize(Roles = "Seller")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Bad ID. Logout and login.");

            await _sellerService.DeleteProduct(id, userId);
            return Ok();
        }
        [Authorize(Roles = "Seller")]
        [HttpGet("new-orders")]
        public async Task<IActionResult> GetNewOrders()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int id))
                throw new Exception("Bad ID. Logout and login.");

            var orders = await _sellerService.GetNewOrders(id);
            return Ok(orders);
        }

        [Authorize(Roles = "Seller")]
        [HttpGet("orders")]
        public async Task<IActionResult> GetOrders()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int id))
                throw new Exception("Bad ID. Logout and login.");

            var orders = await _sellerService.GetOrders(id);
            return Ok(orders);
        }

    }
}
