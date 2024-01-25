using BackVentas.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackVentas.Models.Validation
{
    public class CheckEmail : ValidationAttribute
    {
        private ServiceSettings con = new ServiceSettings();
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var connectionStr = con.GetConnectionString();
            var contextOptions = new DbContextOptionsBuilder<AppDbContext>().UseMySql(connectionStr, ServerVersion.AutoDetect(connectionStr)).Options;
            using (var db = new AppDbContext(contextOptions))
            {
                string email = (string)value;
                if (db.Users.Where(e => e.Email == email).Count() > 0)
                {
                    return new ValidationResult("this email has been taken");
                }
            }

            return ValidationResult.Success;
        }
    }
}
