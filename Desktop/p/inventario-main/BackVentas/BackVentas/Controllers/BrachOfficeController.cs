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
    public class BrachOfficeController : Controller
    {
        private IBrachOffice _BrachOfficeRepository;

        public BrachOfficeController(IBrachOffice BrachOfficeRepository)
        {
            _BrachOfficeRepository = BrachOfficeRepository;
        }
        [HttpGet("get/{id}")]
        public async Task<IActionResult> Index(int id)
        {
            var brach = await _BrachOfficeRepository.GetbyStore(id);
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Data = brach });
        }

        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] BrachOfficeRegister brachDto)
        {
            var brach = new BrachOffices { Name = brachDto.Name, StoreId = brachDto.StoreId };
            try
            {
                await _BrachOfficeRepository.Add(brach);
                await _BrachOfficeRepository.Save();
                return Ok(new AuthResponseDto { IsAuthSuccessful = true });
            }
            catch (Exception e)
            {
                return Ok(new AuthResponseDto { IsAuthSuccessful = false, ErrorMessage = e.Message });
            }
        }
    }
}
