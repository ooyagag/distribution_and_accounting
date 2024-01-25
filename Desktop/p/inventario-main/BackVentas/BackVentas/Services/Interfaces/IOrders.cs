using BackVentas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Services.Interfaces
{
    public interface IOrders : IRepository<Orders>
    {
        dynamic GetOrder(int storeId);
    }
}
