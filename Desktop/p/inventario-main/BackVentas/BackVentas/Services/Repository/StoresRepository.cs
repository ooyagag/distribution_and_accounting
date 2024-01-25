using BackVentas.Data;
using BackVentas.Models;
using BackVentas.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Services.Repository
{
    public class StoresRepository : Repository<Stores>, IStores
    {
        public StoresRepository(AppDbContext ctx) : base(ctx) { }
    }
}
