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
        public string? Ime { get; set; }

        /// <summary>
        /// Prezime polaznika
        /// </summary>
        public string? Prezime { get; set; }

        /// <summary>
        /// Oib polaznika
        /// </summary>
        public string? Oib { get; set; }

        /// <summary>
        /// Email polaznika
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Broj ugovora polaznika
        /// </summary>
        public string? BrojUgovora { get; set; }
    }
}
