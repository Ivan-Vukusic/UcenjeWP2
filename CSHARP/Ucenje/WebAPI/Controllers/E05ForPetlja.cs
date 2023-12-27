using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;
using System.Diagnostics.Tracing;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("E05")]
    public class E05ForPetlja : ControllerBase
    {

        [HttpGet]
        [Route("zad1")]
        public int[] Zad1(int brojevi)
        {
            // Ruta vrati niz s brojevima od 1 do brojevi

            int[] niz = new int[brojevi];

            for (int i = 0; i < brojevi; i++) 
            {
                niz[i] = i+1;
            } 
            return niz;


        }


        [HttpGet]
        [Route("zad2")]
        public int zbrojBrojeva(int broj) 
        {

            // Ruta vraća zbroj primljenih brojeva
            int suma = 0;
            for(int i = 1; i <= broj; i++) 
            {
                suma += i;
            }
            return suma;
            // Ovaj algoritam odrađuje 100 iteracija, DZ napravite u 50
        }


        [HttpGet]
        [Route("zad2dz")]

        public int zbrojiBrojeve(int Broj) 
        {
            int suma = 0;
            for (int i = 1; i <= Broj; i++)
            {
                suma = i * (i + 1) / 2;
            }
            return suma;
        }


        
    }
}
