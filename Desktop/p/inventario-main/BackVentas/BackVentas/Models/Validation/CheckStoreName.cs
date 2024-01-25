using BackVentas.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models.Validation
{
    public class CheckStoreName : ValidationAttribute
    {
        private ServiceSettings con = new ServiceSettings();
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var connectionStr = con.GetConnectionString();
            var contextOptions = new DbContextOptionsBuilder<AppDbContext>().UseMySql(connectionStr, ServerVersion.AutoDetect(connectionStr)).Options;
            using (var db = new AppDbContext(contextOptions))
            {
                string name = (string)value;
                if (db.Stores.Where(e => e.Name == name).Count() > 0)
                {
                    return new ValidationResult("this store's name has been taken");
                }
            }

            return ValidationResult.Success;
        }
    }
}
