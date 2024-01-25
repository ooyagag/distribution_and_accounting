using BackVentas.Data;
using BackVentas.Models;
using BackVentas.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Services.Repository
{
    public class OrdersRepository : Repository<Orders>, IOrders
    {
        public OrdersRepository(AppDbContext ctx) : base(ctx)  {  }

        public dynamic GetOrder(int storeId)
        {
            var query = from o in _ctx.OrderItems
                        join b in _ctx.BrachOffices on o.BrachOfficesId equals b.Id
                        join s in _ctx.Stores on b.StoreId equals s.Id
                        join p in _ctx.Products on o.ProductsId equals p.Id
                        join os in _ctx.Orders on o.Id equals os.OrderItemsId into _os
                        from __os in _os.DefaultIfEmpty()
                        join us in _ctx.Users on __os.UserId equals us.Id into _us
                        from __us in _us.DefaultIfEmpty()
                        where s.Id == storeId && __os != null && __us != null
                        select (new { p.Price, o.Id, b.Name, o.QualityOfProducts, sname = __us.Name, ReturnedProducts = __os.ReturnedProducts , pname = p.Name, __os.DateOfOrder });

            return query;
        }
    }
}
