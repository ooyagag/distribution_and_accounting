using BackVentas.Models.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models.Dtos
{
    public class StocksDto
    {
        public int Id { get; set; }
        public int QuantityOfProduct { get; set; }

        public int ProductId { get; set; }
    }
}
