using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;
using System.Diagnostics.Tracing;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("E07")]
    public class E07Metode : ControllerBase
    {

        [HttpGet]
        [Route("zad1")]
        public int Zad1(int PrviBroj, int DrugiBroj)
        {
            // napišite metodu koja za dva primljena cijela broja
            // vraća njihov zbroj
            // Neka ova metoda Zad1 vrati rezultat napisane metode zadatka

            return Zbroji(PrviBroj,DrugiBroj);

        }

        private int Zbroji(int prviBroj, int drugiBroj)
        {
            return prviBroj + drugiBroj;
        }

        //DZ
        // kreirati rutu zad2 koja prima 4 cijela broja
        // i vraća razliku prvi+drugi i treći+četvrti
        // te kreiranu metodu za zbroj dvaju brojeva

        [HttpGet]
        [Route("zad2")]

        public int Zad2(int prviBroj,int drugiBroj, int treciBroj, int cetvrtiBroj)
        {
            return Zbroji(prviBroj, drugiBroj) - Zbroji(treciBroj, cetvrtiBroj);
        }

        // kreirati rutu zad3 koja prima ime grada i slovo
        // ruta vraća broj pojavljivanja slova u primljenom imenu grada
        // Koristiti metode

        [HttpGet]
        [Route("zad3")]

        public int Zad3(string Grad, string Slovo)
        {
            return Brojac(Grad, Slovo);
        }

        private int Brojac(string Grad, string Slovo)
        {
            int Ukupno = 0;
            foreach (char c in Grad)
            {
                
                if(c == Slovo[0])
                {
                    Ukupno++;
                }
            }

            return Ukupno;
        }


    }
}
