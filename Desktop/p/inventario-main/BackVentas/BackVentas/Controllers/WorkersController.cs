
using BackVentas.Models;
using BackVentas.Models.Dtos;
using BackVentas.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkersController : Controller
    {
        private readonly UserManager<Users> _userManager;
        private readonly IUsersStores usersStoresRepository;
        public WorkersController(UserManager<Users> userManager, IUsersStores usersStores)
        {
            _userManager = userManager;
            usersStoresRepository = usersStores;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Add([FromBody] WorkerRegister model)
        {
            var user = new Users
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name
            };

            try {
                var result = await _userManager.CreateAsync(user, model.Password);
                await _userManager.AddToRoleAsync(user, model.Rol);

                await usersStoresRepository.Add(new UsersStores { StoresId = model.StoreId, UsersId = user.Id });

                await usersStoresRepository.Save();


                return Ok(new AuthResponseDto { IsAuthSuccessful = true });
            }
            catch(Exception e)
            {
                return Ok(new AuthResponseDto { IsAuthSuccessful = false, ErrorMessage = e.Message });
            }
        }

        [HttpGet("Get/{id}")]
        public IActionResult Get(int id)
        {
            var userde = usersStoresRepository.GetByUserDetails(id);
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Data = userde });
        }

    }
}
