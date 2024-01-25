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
    public class StocksController : Controller
    {
        /*private IStocks _StockRepository;

        public StocksController(IStocks StockRepository)
        {
            _StockRepository = StockRepository;
        }

        [HttpPost("save")]
        public async Task<IActionResult> Add([FromBody] StocksDto stockDto)
        {
            var stock = new Stocks { ProductId = stockDto.ProductId, QuantityOfProduct= stockDto.QuantityOfProduct };
            try
            {
                await _StockRepository.Add(stock);
                await _StockRepository.Save();
                return Ok(new AuthResponseDto { IsAuthSuccessful = true });
            }
            catch (Exception e)
            {
                return Ok(new AuthResponseDto { IsAuthSuccessful = false, ErrorMessage = e.Message });
            }
        }


        [HttpGet("Get/{id}")]
        public IActionResult Get(int id)
        {
            var stock = _StockRepository.GetByStockbyStoreId(id);
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Data = stock });
        }*/



    }
}
