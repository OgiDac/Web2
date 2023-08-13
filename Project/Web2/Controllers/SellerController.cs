using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
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
    }
}
