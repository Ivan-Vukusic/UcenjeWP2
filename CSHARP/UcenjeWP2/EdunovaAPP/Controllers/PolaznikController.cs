using EdunovaAPP.Data;
using EdunovaAPP.Models;
using Microsoft.AspNetCore.Mvc;

namespace EdunovaAPP.Controllers
{
    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetom polaznik u bazi
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PolaznikController:ControllerBase
    {
        /// <summary>
        /// Kontekst za rad s bazom koji će biti postavljen s pomoću Dependecy Injection-a
        /// </summary>
        private readonly EdunovaContext _context;
        /// <summary>
        /// Konstruktor klase koja prima Edunova kontext
        /// pomoću DI principa
        /// </summary>
        /// <param name="context"></param>
        public PolaznikController(EdunovaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve polaznike iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        /// 
        ///    GET api/v1/polaznik
        ///    
        /// </remarks>
        /// <returns>Polaznici u bazi</returns>
        /// <response code="200">Sve OK, ako nema podataka content-length: 0 </response>
        /// <response code="400">Zahtjev nije valjan</response>
        /// <response code="503">Baza na koju se spajam nije dostupna</response>
        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var polaznici = _context.Polaznici.ToList();
                if (polaznici == null || polaznici.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(polaznici);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Dodaje novog polaznika u bazu
        /// </summary>
        /// <remarks>
        ///     POST api/v1/polaznik
        ///     {ime: "Primjer imena", prezime: "Primjer prezimena"}
        /// </remarks>
        /// <param name="polaznik">Polaznik za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna</response> 
        /// <returns>Polaznik sa šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(Polaznik polaznik)
        {
            if (!ModelState.IsValid || polaznik == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Polaznici.Add(polaznik);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, polaznik);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Mijenja podatke postojećeg polaznika u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/polaznik/1
        ///
        /// {
        ///  "sifra": 0,
        ///  "ime": "Novo ime",
        ///  "prezime": "Novo prezime",
        ///  "oib": "12345678910",
        ///  "email": "netko@negdje.hr",
        ///  "broj ugovora": "20/2024"
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra polaznika koji se mijenja</param>  
        /// <param name="polaznik">Polaznik za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od polaznika koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi smjera kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Polaznik polaznik)
        {
            if (sifra <= 0 || !ModelState.IsValid || polaznik == null)
            {
                return BadRequest();
            }
            try
            {
                var polaznikIzBaze = _context.Polaznici.Find(sifra);
                if (polaznikIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }
                polaznikIzBaze.Ime = polaznik.Ime;
                polaznikIzBaze.Prezime = polaznik.Prezime;
                polaznikIzBaze.Oib = polaznik.Oib;
                polaznikIzBaze.Email = polaznik.Email;
                polaznikIzBaze.BrojUgovora = polaznik.BrojUgovora;

                _context.Polaznici.Update(polaznikIzBaze);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, polaznikIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Briše polaznika iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    DELETE api/v1/polaznik/1
        ///    
        /// </remarks>
        /// <param name="sifra">Šifra polaznika koji se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu, obrisano je u bazi</response>
        /// <response code="204">Nema u bazi smjera kojeg želimo obrisati</response>
        /// <response code="503">Problem s bazom</response> 
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("aplication/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest();
            }
            try
            {
                var polaznikIzBaze = _context.Polaznici.Find(sifra);
                if (polaznikIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Polaznici.Remove(polaznikIzBaze);
                _context.SaveChanges();

                return new JsonResult(new { poruka = "Obrisano" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }
    }
}
