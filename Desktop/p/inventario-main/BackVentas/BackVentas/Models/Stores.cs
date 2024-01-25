using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models
{
    public class Stores
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }


        public IList<UsersStores> UserStore { get; set; }


        public IList<BrachOffices> BrachOffice { get; set; }


        public IList<Products> Products { get; set; }
    }
}
