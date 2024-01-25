using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models
{
    public class Stocks
    {
        [Key]
        public int Id { get; set; }
        public int QuantityOfProduct { get; set; }

        public int ProductId { get; set; }
        public Products Products { get; set; }


        //public ICollection<OrderItems> OrderItems { get; set; }
    }
}
