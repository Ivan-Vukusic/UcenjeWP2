using Microsoft.AspNetCore.Mvc;


namespace WebAPI.Controllers
{
    [ApiController]
    [Route("Vjezbe")]
    public class Vjezbe : ControllerBase
    {

        [HttpGet]
        [Route("V1")]

        public string V1(string Ime, string Prezime)
        {

            // Ruta vraća unesene podatke
            return Ime + Prezime;
        }

        [HttpGet]
        [Route("V2")]

        public int V2(int a, int b, int c, int d)
        {

            // Ruta vraća rezultat unesenih cijelih brojeva
            return a + b * (a - c) / d;
        }

        [HttpGet]
        [Route("V3")]

        public float V3(int a, int b, int c, int d)
        {

            // Ruta vraća rezultat unesenih cijelih brojeva u decimalnom obliku
            return (float)a * b / (d - c) * d;
        }

        [HttpGet]
        [Route("V4")]

        public bool V4(string a, string b)
        {

            // Ruta vraća True ili False
            return a == b;
        }
    }

}
