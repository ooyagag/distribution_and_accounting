using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models
{
    public class Users : IdentityUser
    {
        [Required]
        public string Name { get; set; }



        public IList<UsersStores> UserStore { get; set; }

        public IList<Orders> Orders { get; set; }
    }
}
