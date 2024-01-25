using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models.Dtos
{
    public class AuthResponseDto
    {
        public bool IsAuthSuccessful { get; set; }
        public dynamic ErrorMessage { get; set; }
        public dynamic Data { get; set; }
        public string Token { get; set; }
    }
}
