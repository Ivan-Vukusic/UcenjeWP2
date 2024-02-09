using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.LjubavniKalkulator
{
    internal class Kalkulator
    {
        public string PrvoIme { get; set; }
        public string DrugoIme { get; set; }
                
        public Kalkulator(string prvoIme, string drugoIme)
        {
            PrvoIme = prvoIme.Trim().ToLower();
            DrugoIme = drugoIme.Trim().ToLower();
        }

        public string Rezultat()
        {
            return Izracunaj(SlovaUNiz(PrvoIme + DrugoIme)) + " %";
        }

        private int[] SlovaUNiz(string Imena)
        {
            string SpajanjeImena = PrvoIme + DrugoIme; 

            char[] NizZnakova = SpajanjeImena.ToCharArray(); 

            int[] NizBrojeva = new int[NizZnakova.Length]; 

            int index = 0;
            int broj;

            foreach(char c in NizZnakova) 
            {
                broj = 0;
                foreach(char cc in NizZnakova) 
                {
                    if (c == cc)
                    {
                        broj++;
                    }
                }
                NizBrojeva[index++] = broj;
            }

            foreach(int b in NizBrojeva)
            {
                Console.Write(b);
            }
            Console.WriteLine();

            return NizBrojeva;
        }

        private int Izracunaj(int[] Brojevi)
        {
            
                       

            return 0;            
        }
    }
}
