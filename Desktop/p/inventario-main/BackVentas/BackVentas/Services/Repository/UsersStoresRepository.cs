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
    public class UsersStoresRepository : Repository<UsersStores>, IUsersStores
    {
        public UsersStoresRepository(AppDbContext ctx) : base(ctx)  { }

        public async Task<UsersStores> GetByUserId(string iduser)
        {
            return await _ctx.UserStore.Where(b => b.UsersId == iduser ).FirstAsync();
        }

        public dynamic GetByUserDetails(int idstore)
        {
            /*return await _ctx.UserStore.Include(x => x.Users)
                .Where(x => x.StoresId == idstore )
                .ToListAsync();*/
            var query = from us in _ctx.UserStore
                        join u in _ctx.Users on us.UsersId equals u.Id
                        join s in _ctx.Stores on us.StoresId equals s.Id
                        where s.Id == idstore
                        select( new { u.Id, u.Name, u.Email });

            return query;
        }
    }
}
