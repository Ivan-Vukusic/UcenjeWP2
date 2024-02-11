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
            char[] NizZnakova = Imena.ToCharArray();

            int[] NizBrojeva = new int[NizZnakova.Length];

            int index = 0;
            int broj;

            foreach (char c in NizZnakova)
            {
                broj = 0;
                foreach (char cc in NizZnakova)
                {
                    if (c == cc)
                    {
                        broj++;
                    }
                }
                NizBrojeva[index++] = broj;
            }

            foreach (int b in NizBrojeva)
            {
                Console.Write(b);
            }
            Console.WriteLine();

            return NizBrojeva;
        }

        private int Izracunaj(int[] NizBrojeva)
        {
            int Gotovo = 0;
            int[] DrugiNiz;

            if (NizBrojeva.Length % 2 == 0)
            {
                DrugiNiz = new int[NizBrojeva.Length / 2];
            }
            else
            {
                DrugiNiz = new int[(NizBrojeva.Length / 2) + 1];
            }

            for (int i = 0, j = NizBrojeva.Length - 1; i < NizBrojeva.Length / 2; i++, j--)
            {
                DrugiNiz[i] = NizBrojeva[i] + NizBrojeva[j];
            }
            
            if (NizBrojeva.Length % 2 != 0)
            {
                DrugiNiz[DrugiNiz.Length - 1] = NizBrojeva[NizBrojeva.Length / 2];
            }
            
            string Brojevi = string.Join("", DrugiNiz);
                        
            DrugiNiz = new int[Brojevi.Length];
                        
            for (int i = 0; i < Brojevi.Length; i++)
            {
                DrugiNiz[i] = int.Parse(Brojevi[i].ToString());
            }

            Gotovo = int.Parse(Brojevi);

            if (Gotovo > 100)
            {
                Console.WriteLine(Gotovo);
                return Izracunaj(DrugiNiz);
            }

            return Gotovo;
        }
    }
}
