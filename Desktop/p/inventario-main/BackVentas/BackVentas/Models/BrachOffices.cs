using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models
{
    public class BrachOffices
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public int StoreId { get; set; }
        public Stores Stores { get; set; }

        public ICollection<OrderItems> OrderItems { get; set; }
    }
}
