using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("E02")]
    public class E02VarijableTipoviPodatakaOperatori : ControllerBase
    {

        [HttpGet]
        [Route("zad1")]
        public int zad1()
        {

            // vratite najmanji broj
            return int.MinValue;

        }


        [HttpGet]
        [Route("zad2")]
        public float zad2(int i, int j)
        {
            // Ruta vraća kvocijent dvaju primljenih brojeva
            return i / (float)j;

        }

        [HttpGet]
        [Route("zad3")]
        public float zad3(int i, int j)
        {
            // Ruta vraća zbroj umnoška i kvocijenta
            var Umnozak = i * j; // var je ključna riječ koja preuzima tip podataka sa desne strane znaka jednako
            var Kvocijent = (float)i / j;
            return Umnozak + Kvocijent;

        }

        [HttpGet]
        [Route("zad4")]
        public string zad4(string s, string s1)
        {
            // Ruta vraća spojene primljene znakove 
            return s + s1;
        }

        [HttpGet]
        [Route("zad5")]
        public bool IstiSu(int a, int b)
        {
            Console.WriteLine("a={0}",a); // pogledati u konzoli
            // Ruta vraća True ako je a jednako b, inače vraća False 
            return a == b;
        }
    }
}
