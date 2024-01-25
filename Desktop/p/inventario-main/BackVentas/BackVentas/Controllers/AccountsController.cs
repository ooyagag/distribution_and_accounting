using BackVentas.JwtFeatures;
using BackVentas.Models;
using BackVentas.Models.Dtos;
using BackVentas.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : Controller
    {
        private readonly UserManager<Users> _userManager;
        private readonly JwtHandler _jwtHandler;
        private readonly IUsersStores usersStoresRepository;
        private readonly IStores storesRepository;
        public AccountsController(UserManager<Users> userManager, JwtHandler jwtHandler, IUsersStores usersStores, IStores stores)
        {
            _userManager = userManager;
            _jwtHandler = jwtHandler;
            usersStoresRepository = usersStores;
            storesRepository = stores;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
        {
            try {
                var user = await _userManager.FindByNameAsync(userForAuthentication.Email);
                if (user == null || !await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                    return Ok(new AuthResponseDto { IsAuthSuccessful = false, ErrorMessage = "Invalid Credentials" });

                var storeId = usersStoresRepository.GetByUserId(user.Id);

                var signingCredentials = _jwtHandler.GetSigningCredentials();
                var claims = _jwtHandler.GetClaims(user);
                var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
                var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new AuthResponseDto{ IsAuthSuccessful = true, Token = token, Data = storeId.Result.StoresId });
            }
            catch(Exception e) {
                return Ok(new AuthResponseDto{ IsAuthSuccessful = false, ErrorMessage = e.Message });
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegister model)
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

                var store = new Stores { Name = model.StoreName };

                await storesRepository.Add(store);

                await storesRepository.Save();

                await usersStoresRepository.Add(new UsersStores { StoresId = store.Id, UsersId = user.Id });

                await usersStoresRepository.Save();

                var signingCredentials = _jwtHandler.GetSigningCredentials();
                var claims = _jwtHandler.GetClaims(user);
                var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
                var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token, Data = store.Id });

            }
            catch(Exception e)
            {
                return Ok(new AuthResponseDto { IsAuthSuccessful = false, ErrorMessage = e.Message});
            }

            
        }



           


    }
}
