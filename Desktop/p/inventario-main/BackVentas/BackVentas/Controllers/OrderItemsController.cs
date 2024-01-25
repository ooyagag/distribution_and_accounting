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
    public class OrderItemsController : Controller
    {
        private IOrderItems _orderItemsRepository;
        public OrderItemsController(IOrderItems orderItems)
        {
            _orderItemsRepository = orderItems;
        }

        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] OrderItemsDto orderItemsDto)
        {
            var OrdersItems = new OrderItems { 
                BrachOfficesId = orderItemsDto.BrachOfficesId, 
                QualityOfProducts = orderItemsDto.QuantityOfProducts, 
                ProductsId = orderItemsDto.ProductsId 
            };

            try {
                await _orderItemsRepository.Add(OrdersItems);
                await _orderItemsRepository.Save();
                return Ok(new AuthResponseDto { IsAuthSuccessful = true });
            }
            catch(Exception e) {
                return Ok(new AuthResponseDto { IsAuthSuccessful = false, ErrorMessage = e.Message });
            }
            
        }


        [HttpGet("get/{id}")]
        public IActionResult Index(int id)
        {
            var orderItems = _orderItemsRepository.GetOrderItems(id);
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Data = orderItems });
        }


    }
}
