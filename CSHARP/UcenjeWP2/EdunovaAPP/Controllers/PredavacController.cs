using EdunovaAPP.Data;
using EdunovaAPP.Models;
using Microsoft.AspNetCore.Mvc;

namespace EdunovaAPP.Controllers
{
    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetom predavač u bazi
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PredavacController : ControllerBase
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
        public PredavacController(EdunovaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve predavače iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        /// 
        ///    GET api/v1/predavač
        ///    
        /// </remarks>
        /// <returns>Predavači u bazi</returns>
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
                var predavaci = _context.Predavaci.ToList();
                if (predavaci == null || predavaci.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(predavaci);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Dodaje novog predavača u bazu
        /// </summary>
        /// <remarks>
        ///     POST api/v1/predavač
        ///     {ime: "Primjer imena", prezime: "Primjer prezimena"}
        /// </remarks>
        /// <param name="predavac">Predavač za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna</response> 
        /// <returns>Predavač s šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(Predavac predavac)
        {
            if (!ModelState.IsValid || predavac == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Predavaci.Add(predavac);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, predavac);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Mijenja podatke postojećeg predavača u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/predavač/1
        ///
        /// {
        ///  "sifra": 0,
        ///  "ime": "Novo ime",
        ///  "prezime": "Novo prezime",
        ///  "oib": "12345678910",
        ///  "email": "netko@negdje.hr",
        ///  "iban": "HR00 1111 1112 2222 2222 2"
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra predavača koji se mijenja</param>  
        /// <param name="predavac">Predavač za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od predavača koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi smjera kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Predavac predavac)
        {
            if (sifra <= 0 || !ModelState.IsValid || predavac == null)
            {
                return BadRequest();
            }
            try
            {
                var predavacIzBaze = _context.Predavaci.Find(sifra);
                if (predavacIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }
                predavacIzBaze.Ime = predavac.Ime;
                predavacIzBaze.Prezime = predavac.Prezime;
                predavacIzBaze.Oib = predavac.Oib;
                predavacIzBaze.Email = predavac.Email;
                predavacIzBaze.Iban = predavac.Iban;

                _context.Predavaci.Update(predavacIzBaze);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, predavacIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Briše predavača iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    DELETE api/v1/predavač/1
        ///    
        /// </remarks>
        /// <param name="sifra">Šifra predavača koji se briše</param>  
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
                var predavacIzBaze = _context.Predavaci.Find(sifra);
                if (predavacIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Predavaci.Remove(predavacIzBaze);
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


