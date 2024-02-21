using System.ComponentModel.DataAnnotations;

namespace EdunovaAPP.Models
{
    /// <summary>
    /// Ovo mi je POCO koji mi je mapiran na bazu
    /// </summary>
    public class Predavac : Entitet
    {
        /// <summary>
        /// Ime predavača
        /// </summary>
        [Required(ErrorMessage = "Ime obavezno")]
        public string? Ime { get; set; }

        /// <summary>
        /// Prezime predavača
        /// </summary>
        [Required(ErrorMessage = "Prezime obavezno")]
        public string? Prezime { get; set; }

        /// <summary>
        /// Oib predavača
        /// </summary>
        [StringLength(11, MinimumLength = 11, ErrorMessage = "Neispravan unos! OIB mora imati 11 znamenki")]
        public string? Oib { get; set; }

        /// <summary>
        /// Email predavača
        /// </summary>
        [Required(ErrorMessage = "Email obavezno")]
        public string? Email { get; set; }

        /// <summary>
        /// Iban predavača
        /// </summary>
        public string? Iban { get; set; }
    }
}
