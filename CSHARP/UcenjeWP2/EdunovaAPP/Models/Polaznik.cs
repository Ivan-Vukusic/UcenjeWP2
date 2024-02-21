using System.ComponentModel.DataAnnotations;

namespace EdunovaAPP.Models
{
    /// <summary>
    /// Ovo mi je POCO koji mi je mapiran na bazu
    /// </summary>
    public class Polaznik : Entitet
    {
        /// <summary>
        /// Ime polaznika
        /// </summary>
        [Required(ErrorMessage ="Ime obavezno")]
        public string? Ime { get; set; }

        /// <summary>
        /// Prezime polaznika
        /// </summary>           
        [Required(ErrorMessage ="Prezime obavezno")]
        public string? Prezime { get; set; }

        /// <summary>
        /// Oib polaznika
        /// </summary>
        [StringLength(11, MinimumLength = 11, ErrorMessage = "Neispravan unos! OIB mora imati 11 znamenki")]
        public string? Oib { get; set; }

        /// <summary>
        /// Email polaznika
        /// </summary>
        [Required(ErrorMessage ="Email obavezno")]
        public string? Email { get; set; }

        /// <summary>
        /// Broj ugovora polaznika
        /// </summary>
        public string? BrojUgovora { get; set; }
    }
}
