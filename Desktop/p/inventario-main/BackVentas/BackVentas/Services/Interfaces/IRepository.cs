using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Services.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task Add(T entity);

        Task<List<T>> Get();

        Task Save();

    }
}
