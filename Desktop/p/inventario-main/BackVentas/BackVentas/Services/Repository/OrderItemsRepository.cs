using BackVentas.Data;
using BackVentas.Models;
using BackVentas.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Services.Repository
{
    public class OrderItemsRepository : Repository<OrderItems>, IOrderItems
    {
        public OrderItemsRepository(AppDbContext ctx) : base(ctx) { }

        /*
           select b.Id, b.Name, o.QualityOfProducts, os.ReturnedProducts, us.Name as sname from OrderItems o
           inner join BrachOffice b on b.Id = o.Id
	       inner join Stores s on s.Id = b.StoreId
	       inner join Products p on p.Id = o.ProductsId
	       left join  Orders os on os.OrderItemsId = b.Id
	       left join AspNetUsers us on us.Id = os.UserId
	       where s.Id = 1 and us.Name is null and us.Name is null
         */

        /*
         var query = from us in _ctx.UserStore
                        join u in _ctx.Users on us.UsersId equals u.Id
                        join s in _ctx.Stores on us.StoresId equals s.Id
                        where s.Id == idstore
                        select( new { u.Id, u.Name, u.Email });
         
         */
        public dynamic GetOrderItems(int storeId)
        {

            var query = from o in _ctx.OrderItems
                        join b in _ctx.BrachOffices on o.BrachOfficesId equals b.Id
                        join s in _ctx.Stores on b.StoreId equals s.Id
                        join p in _ctx.Products on o.ProductsId equals p.Id
                        join os in _ctx.Orders on o.Id equals os.OrderItemsId into _os
                        from __os in _os.DefaultIfEmpty()
                        join us in _ctx.Users on __os.UserId equals us.Id into _us
                        from __us in _us.DefaultIfEmpty()
                        where s.Id == storeId && __os == null && __us == null
                        select (new { o.Id, b.Name, o.QualityOfProducts, sname = __us.Name, ReturnedProducts = __os.ReturnedProducts == null ? 0 : __os.ReturnedProducts, pname = p.Name });

            return query;
        }
    }
}
