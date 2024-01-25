using BackVentas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Services.Interfaces
{
    public interface IUsersStores : IRepository<UsersStores>
    {
        Task<UsersStores> GetByUserId(string iduser);
        dynamic GetByUserDetails(int idstore);
    }
}
