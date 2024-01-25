using BackVentas.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Data
{
    public class AppDbContext : IdentityDbContext<Users>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Users>().HasIndex(u => u.Email).IsUnique().HasDatabaseName("Idx_email_users");
            builder.Entity<Stores>().HasIndex(u => u.Name).IsUnique().HasDatabaseName("Idx_name_stores");


            /*  Relaciones */
            /*   Users - stores M : M  */
            builder.Entity<UsersStores>().HasKey(us => new { us.UsersId, us.StoresId });

            /*   Users - Orders M : 1  */
            builder.Entity<Orders>()
                .HasOne<Users>(u => u.Users)
                .WithMany(o => o.Orders)
                .HasForeignKey(u => u.UserId);


            /* Stocks - Products M : 1  */
            builder.Entity<Products>()
                .HasOne<Stores>(s => s.Stores)
                .WithMany(p => p.Products)
                .HasForeignKey(u => u.StoresId);



            /*   Branch - Stores 1 : M  */
            builder.Entity<BrachOffices>()
                .HasOne<Stores>(st => st.Stores)
                .WithMany(bo => bo.BrachOffice)
                .HasForeignKey(s => s.StoreId );

            /*   Branch - OrderItems 1 : M  */
            builder.Entity<OrderItems>()
                .HasOne<BrachOffices>(br => br.BrachOffice)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(s => s.BrachOfficesId);


            /*  OrderItems - Stocks  1 : M*/
           /* builder.Entity<OrderItems>()
                .HasOne<Stocks>(s => s.Stocks)
                .WithMany(or => or.OrderItems)
                .HasForeignKey(p => p.StockId);*/


            /*  OrderItems - Orders M : 1 */
            builder.Entity<OrderItems>()
                .HasOne<Orders>(o => o.Orders)
                .WithOne(or => or.OrderItems)
                .HasForeignKey<Orders>(s => s.OrderItemsId);




            /*  Products - Stocks M : 1 */
            /*builder.Entity<Stocks>()
                .HasOne<Products>(p => p.Products)
                .WithMany(st => st.Stocks)
                .HasForeignKey(s => s.ProductId);*/



            builder.Entity<OrderItems>()
                .HasOne<Products>(p => p.Products)
                .WithMany(or => or.OrderItems)
                .HasForeignKey(s => s.ProductsId)
                .OnDelete(DeleteBehavior.Restrict);

           

            builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "Repartidor", NormalizedName = "REPARTIDOR", Id = Guid.NewGuid().ToString(), ConcurrencyStamp = Guid.NewGuid().ToString() });
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "Admin", NormalizedName = "ADMIN", Id = Guid.NewGuid().ToString(), ConcurrencyStamp = Guid.NewGuid().ToString() });



            base.OnModelCreating(builder);
        }

        public DbSet<Stores> Stores { get; set; }
        public DbSet<UsersStores> UserStore { get; set; }
        public DbSet<Orders> Orders { get; set; }
        //public DbSet<Stocks> Stocks { get; set; }
        public DbSet<BrachOffices> BrachOffices { get; set; }
        public DbSet<OrderItems> OrderItems { get; set; }
        public DbSet<Products> Products { get; set; }


    }
}
