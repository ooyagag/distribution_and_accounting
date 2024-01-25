using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models.Dtos
{
    public class BrachOfficeRegister
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int StoreId { get; set; }
    }
}
