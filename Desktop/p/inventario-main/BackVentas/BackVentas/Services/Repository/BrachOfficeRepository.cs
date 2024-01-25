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
    public class BrachOfficeRepository : Repository<BrachOffices>, IBrachOffice
    {
        public BrachOfficeRepository(AppDbContext ctx) : base(ctx) { }

        public async Task<List<BrachOffices>> GetbyStore(int id)
        {
            return await _ctx.BrachOffices.Where(p => p.StoreId == id).ToListAsync();
        }
    }
}
