using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models.Dtos
{
    public class OrdersDto
    {
        public int Id { get; set; }

        public DateTime DateOfOrder { get; set; }

        public int ReturnedProducts { get; set; }

        public string UserId { get; set; }

        public int OrderItemsId { get; set; }
    }
}
