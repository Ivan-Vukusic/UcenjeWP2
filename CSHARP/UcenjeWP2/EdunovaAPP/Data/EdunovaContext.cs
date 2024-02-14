using EdunovaAPP.Models;
using Microsoft.EntityFrameworkCore;

namespace EdunovaAPP.Data
{
    /// <summary>
    /// Ovo mi je datoteka gdje ću navoditi datasetove i načine spajanja u bazi
    /// </summary>
    public class EdunovaContext : DbContext
    {
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="options"></param>
        public EdunovaContext(DbContextOptions<EdunovaContext> options) 
            :base(options) 
        {

        }

        /// <summary>
        /// Ovo su mi smjerovi u bazi
        /// </summary>
        public DbSet<Smjer> Smjerovi { get; set; }

    }
}
