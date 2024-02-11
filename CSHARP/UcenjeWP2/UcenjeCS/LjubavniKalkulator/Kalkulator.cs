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

        public Kalkulator(string prvoIme, string drugoIme) // konstruktor
        {
            PrvoIme = prvoIme.Trim().ToLower(); // brisanje viška mjesta i prebacivanje u malo slovo
            DrugoIme = drugoIme.Trim().ToLower(); // brisanje viška mjesta i prebacivanje u malo slovo
        }

        public string Rezultat() // metoda za izračun i ispis rezultata
        {
            return Izracunaj(SlovaUNiz(PrvoIme + DrugoIme)) + " %";
        }

        private int[] SlovaUNiz(string Imena) // metoda za promjenu spojenih imena u niz znakova
        {
            char[] NizZnakova = Imena.ToCharArray();

            int[] NizBrojeva = new int[NizZnakova.Length];

            int index = 0;
            int broj;

            foreach (char c in NizZnakova) // iteracija i brojanje znakova
            {
                broj = 0;
                foreach (char cc in NizZnakova)
                {
                    if (c == cc)
                    {
                        broj++;
                    }
                }
                NizBrojeva[index++] = broj; // spremanje broja znakova u niz
            }

            foreach (int b in NizBrojeva) // ispis elemenata niza
            {
                Console.Write(b);
            }
            Console.WriteLine();
            return NizBrojeva;
        }

        private int Izracunaj(int[] NizBrojeva) // metoda izračunava rezultat iz niza znakova
        { 
            int Gotovo = 0;
            int[] DrugiNiz;

            if (NizBrojeva.Length % 2 == 0) // provjera dužine imena
            {
                DrugiNiz = new int[NizBrojeva.Length / 2];
            }
            else
            {
                DrugiNiz = new int[(NizBrojeva.Length / 2) + 1];
            }

            for (int i = 0, j = NizBrojeva.Length - 1; i < NizBrojeva.Length / 2; i++, j--) // zbrajanje elemenata od krajeva prema sredini
            {
                DrugiNiz[i] = NizBrojeva[i] + NizBrojeva[j];
            }
            
            if (NizBrojeva.Length % 2 != 0) // ako je niz neparan, srednji element se prenosi u novi niz
            {
                DrugiNiz[DrugiNiz.Length - 1] = NizBrojeva[NizBrojeva.Length / 2];
            }
            
            string Brojevi = string.Join("", DrugiNiz); // promjena u string da bi svi znakovi niza bili pojedinačni                       
            DrugiNiz = new int[Brojevi.Length]; 
                        
            for (int i = 0; i < Brojevi.Length; i++)
            {
                DrugiNiz[i] = int.Parse(Brojevi[i].ToString());
            }

            Gotovo = int.Parse(Brojevi);
            if (Gotovo > 100) // ako je rezultat veći od 100, ponovo se poziva rekurzivni algoritam
            {
                Console.WriteLine(Gotovo); // ispis postupka
                return Izracunaj(DrugiNiz); // rekurzivna obrada
            }
            return Gotovo; 
        }
    }
}
