using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models
{
    public class UsersStores
    {
        public string UsersId { get; set; }
        public Users Users { get; set; }


        public int StoresId { get; set; }
        public Stores Stores { get; set; }
    }
}
