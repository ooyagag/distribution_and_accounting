using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models
{
    public class OrderItems
    {
        [Key]
        public int Id { get; set; }

        public int BrachOfficesId { get; set; }
        public BrachOffices BrachOffice { get; set; }


        public int QualityOfProducts { get; set; }

        /*public int StockId { get; set; }
        public Stocks Stocks { get; set; }*/



        public Orders Orders { get; set; }



        public Products Products { get; set; }
        public int ProductsId { get; set; }


    }
}
