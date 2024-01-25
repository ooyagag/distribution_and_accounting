using BackVentas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Services.Interfaces
{
    public interface IProducts : IRepository<Products>
    {
        Task<List<Products>> GetByStoreId(int idstore);
    }
}
