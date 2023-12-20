using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("E04")]
    public class E04Nizovi : ControllerBase
    {

        [HttpPost]
        [Route("zad1")]
        public string Zad1(string[] Podaci)
        {
            // vrati prvi element primljenog niza
            return Podaci[0];
        }


        [HttpPut]
        [Route("zad2")]
        public int Zad2(string[] Podaci) 
        {
            // ruta prima cijele brojeve kao nizove znakova
            // ruta će primiti 3 broja
            // ruta će vratiti najveći broj

            var b1 = int.Parse(Podaci[0]);
            var b2 = int.Parse(Podaci[1]);
            var b3 = int.Parse(Podaci[2]);

            // b1
            if (b1 >= b2 && b1 >= b3)
            {
                return b1;
            }
            
            //b2
            if(b2 >= b1 && b2 >= b3) 
            {
                return b2;
            }

            return b3;
        }


        [HttpDelete]
        [Route("zad3")]
        public string brojElemenataNiza(int[] Podaci) 
        {
            // ruta vraća broj elemenata niza kao string
            //return "" + Podaci.Count();
            //return  Podaci.Count().ToString();

            return $"{ Podaci.Count()}"; 
        }
    }
}
