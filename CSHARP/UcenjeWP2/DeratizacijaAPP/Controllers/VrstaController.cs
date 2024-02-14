using DeratizacijaAPP.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        /// <response code = "200">Sve ok</response>
        /// <response code = "400">Zahtjev nije valjan</response>
        /// <response code = "503"></response>
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Vrste.ToList());
        }

    }
}
