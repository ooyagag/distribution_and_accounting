using BackVentas.Data;
using BackVentas.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Services.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly AppDbContext _ctx;

        public Repository(AppDbContext ctx) => _ctx = ctx;

        public async Task Add(T entity) => await _ctx.Set<T>().AddAsync(entity);

        public async Task<List<T>> Get() => await _ctx.Set<T>().ToListAsync();

        public async Task Save() => await _ctx.SaveChangesAsync();
    }
}
