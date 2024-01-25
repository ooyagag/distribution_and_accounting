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
    public class OrdersController : Controller
    {
        private IOrders _ordersRepository;

        public OrdersController(IOrders ordersRepository)
        {
            _ordersRepository = ordersRepository;
        }

        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] OrdersDto ordersDto)
        {
            var order = new Orders { 
                OrderItemsId = ordersDto.OrderItemsId, 
                ReturnedProducts=ordersDto.ReturnedProducts,
                UserId = ordersDto.UserId,
                DateOfOrder = DateTime.Now
            };

            try {
                await _ordersRepository.Add(order);
                await _ordersRepository.Save();
                return Ok(new AuthResponseDto { IsAuthSuccessful = true });
            }
            catch(Exception e)
            {
                return Ok(new AuthResponseDto { IsAuthSuccessful = false, ErrorMessage = e.Message });
            }
        }



        [HttpGet("get/{id}")]
        public IActionResult Index(int id)
        {
            var orderItems = _ordersRepository.GetOrder(id);
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Data = orderItems });
        }
    }
}
