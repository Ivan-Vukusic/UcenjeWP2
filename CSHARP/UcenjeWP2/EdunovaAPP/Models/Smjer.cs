using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EdunovaAPP.Models
{
    /// <summary>
    /// Ovo mi je POCO koji mi je mapiran na bazu
    /// </summary>
    public class Smjer:Entitet
    {
        /// <summary>
        /// Naziv u bazi
        /// </summary>
        [Required(ErrorMessage ="Naziv obavezno")]
        public string? Naziv { get; set; }

        /// <summary>
        /// Trajanje u satima
        /// </summary>
        [Range(30, 500, ErrorMessage = "{0} mora biti između {1} i {2}")]
        [Column("BrojSati")]
        public int? Trajanje { get; set; }

        /// <summary>
        /// Cijena u eurima
        /// </summary>
        [Range(0, 10000, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        public decimal? Cijena { get; set; }

        /// <summary>
        /// Iznos u Eurima
        /// </summary>
        public decimal? Upisnina { get; set; }

        /// <summary>
        /// Oznaka da li je smjer verificiran od strane ministarstva ili ne
        /// </summary>
        public bool? Verificiran { get; set; }
    }
}
