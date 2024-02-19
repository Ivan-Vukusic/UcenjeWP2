namespace EdunovaAPP.Models
{
    /// <summary>
    /// Ovo je povezna tablica između grupe i polaznika
    /// </summary>
    public class Clan
    {
        /// <summary>
        /// Poveznica grupe
        /// </summary>
        public Grupa? Grupa { get; set; }

        /// <summary>
        /// Poveznica polaznika
        /// </summary>
        public Polaznik? Polaznik { get; set; }
    }
}
