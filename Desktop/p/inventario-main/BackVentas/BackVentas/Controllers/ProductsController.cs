using BackVentas.Models;
using BackVentas.Models.Dtos;
using BackVentas.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : Controller
    {
        private IProducts productsRepository;

        public ProductsController(IProducts products)
        {
            productsRepository = products;
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Index(int id)
        {
            var products = await productsRepository.GetByStoreId(id);
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Data = products });
        }

        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] ProductsDto productsDto)
        {
            var producto = new Products { Name = productsDto.Name, Price = productsDto.Price, StoresId = productsDto.StoresId, Descriptions = productsDto.Descriptions };
            try {
                await productsRepository.Add(producto);
                await productsRepository.Save();
                return Ok(new AuthResponseDto { IsAuthSuccessful = true });
            }
            catch(Exception e)
            {
                return Ok(new AuthResponseDto { IsAuthSuccessful = false, ErrorMessage = e.Message });
            }
        }
    }
}
