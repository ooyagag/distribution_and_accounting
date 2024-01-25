using BackVentas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Services.Interfaces
{
    public interface IStocks : IRepository<Stocks>
    {
        /*dynamic GetByStockbyStoreId(int idstore);

        Task<Stocks> GetbyProductId(int ProductId);*/
    }
}
