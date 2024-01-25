using BackVentas.Models.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models.Dtos
{
    public class WorkerRegister
    {
        [Required(ErrorMessage = "Es necesario el campo nombre")]
        public string Name { get; set; }

        [CheckEmail]
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }

        public string Rol { get; set; }

        [Required]
        public int StoreId { get; set; }


    }
}
