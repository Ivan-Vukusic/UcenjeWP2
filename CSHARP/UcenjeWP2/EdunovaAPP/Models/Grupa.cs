namespace EdunovaAPP.Models
{
    /// <summary>
    /// Ovo mi je POCO koji mi je mapiran na bazu
    /// </summary>
    public class Grupa
    {
        /// <summary>
        /// Naziv grupe
        /// </summary>
        public string? Naziv { get; set; }

        /// <summary>
        /// Predavač grupe
        /// </summary>
        public Predavac? Predavac { get; set; }

        /// <summary>
        /// Smjer grupe
        /// </summary>
        public Smjer? Smjer { get; set; }

        /// <summary>
        /// Maksimalan broj polaznika
        /// </summary>
        public int? MaksimalnoPolaznika { get; set; }

        /// <summary>
        /// Datum početka grupe
        /// </summary>
        public DateTime? DatumPocetka { get; set; }
    }
}
