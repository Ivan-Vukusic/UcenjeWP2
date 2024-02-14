using DeratizacijaAPP.Data;
using Microsoft.AspNetCore.Mvc;

namespace DeratizacijaAPP.Controllers
{
    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetom Vrsta u bazi
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class VrstaController : ControllerBase
    {
        /// <summary>
        /// Kontekst za rad s bazom koji će biti postavljen pomoći Dependency Injection
        /// </summary>
        private readonly DeratizacijaContext _context;

        /// <summary>
        /// Konstruktor klase koja prima Deratizacija kontekst
        /// pomoću DI principa
        /// </summary>
        /// <param name="context"></param>
        public VrstaController(DeratizacijaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve vrste iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        /// 
        ///     GET api/v1/vrsta
        /// 
        /// </remarks>
        /// <returns>Vrste u bazi</returns>
        /// <response code = "200">Sve ok, ako nema podataka content length: 0</response>
        /// <response code = "400">Zahtjev nije valjan</response>
        /// <response code = "503">Baza na koju se spajam nije dostupna</response>
        [HttpGet]
        public IActionResult Get()
        {
            // Kontrola ukoliko upit nije valjan
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var vrste = _context.Vrste.ToList();
                if (vrste == null || vrste.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(vrste);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

    }
}
