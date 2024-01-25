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
    public class ProductsRepository : Repository<Products>, IProducts
    {
        public ProductsRepository(AppDbContext ctx) : base(ctx) { }

        public async Task<List<Products>> GetByStoreId(int idstore)
        {
            return await _ctx.Products.Where(p => p.StoresId == idstore).ToListAsync();
        }
    }
}
