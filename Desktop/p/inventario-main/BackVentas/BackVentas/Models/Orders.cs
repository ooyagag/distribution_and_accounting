using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models
{
    public class Orders
    {
        [Key]
        public int Id { get; set; }

        public DateTime DateOfOrder { get; set; }

        public int ReturnedProducts { get; set; }


        public string UserId { get; set; }
        public Users Users { get; set; }


        public int OrderItemsId { get; set; }
        public OrderItems OrderItems { get; set; }





    }
}
