using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models.Dtos
{
    public class OrderItemsDto
    {
        public int Id { get; set; }

        public int QuantityOfProducts { get; set; }

        public int ProductsId { get; set; }

        public int BrachOfficesId { get; set; }
    }
}
