using DeratizacijaAPP.Models;
using Microsoft.EntityFrameworkCore;

namespace DeratizacijaAPP.Data
{
    /// <summary>
    /// Ovo mi je datoteka gdje ću navoditi datasetove i načine spajanja u bazi
    /// </summary>
    public class DeratizacijaContext : DbContext
    {
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="options"></param>
        public DeratizacijaContext(DbContextOptions<DeratizacijaContext> options)
            :base(options)
        {

        }

        /// <summary>
        /// Vrste u bazi
        /// </summary>
        public DbSet <Vrsta> Vrste { get; set; }

    }
}
