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
        public string? Ime { get; set; }

        /// <summary>
        /// Prezime predavača
        /// </summary>
        public string? Prezime { get; set; }

        /// <summary>
        /// Oib predavača
        /// </summary>
        public string? Oib { get; set; }

        /// <summary>
        /// Email predavača
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Iban predavača
        /// </summary>
        public string? Iban { get; set; }
    }
}
