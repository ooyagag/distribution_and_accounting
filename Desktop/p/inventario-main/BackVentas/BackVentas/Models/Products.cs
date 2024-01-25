using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models
{
    public class Products
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string Descriptions { get; set; }



        public int StoresId { get; set; }
        public Stores Stores { get; set; }


        public ICollection<OrderItems> OrderItems { get; set; }

    }
}
