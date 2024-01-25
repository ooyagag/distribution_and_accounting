using BackVentas.Data;
using BackVentas.Models;
using BackVentas.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Services.Repository
{
    public class StocksRepository : Repository<Stocks>, IStocks
    {
        public StocksRepository(AppDbContext ctx) : base(ctx) { }

       /* public async Task<Stocks> GetbyProductId(int ProductId)
        {
            return await _ctx.Stocks.FirstOrDefaultAsync(e => e.ProductId == ProductId);
        }

        public dynamic GetByStockbyStoreId(int idstore)
        {
            var query = from s in _ctx.Stocks
                        join p in _ctx.Products on s.ProductId equals p.Id
                        join st in _ctx.Stores on p.StoresId equals st.Id
                        where st.Id == idstore
                        select (new { p.Name, s.ProductId, s.QuantityOfProduct, s.Id });
            return query;
        }*/
    }
}
