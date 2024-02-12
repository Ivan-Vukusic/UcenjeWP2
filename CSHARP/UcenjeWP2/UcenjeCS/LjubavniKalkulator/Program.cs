using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.LjubavniKalkulator
{
    internal class Program
    {        
        public static void Izvedi() // metoda koja se izvodi
        {
            Naslov();
            Console.WriteLine();
            Console.WriteLine(new Kalkulator(Unos("Unesi prvo ime: "), Unos("Unesi drugo ime: ")).Rezultat()); 
        }

        private static void Naslov()
        {
            Console.WriteLine("♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥");            
            Console.WriteLine("♥♥ DOBRODOŠLI U AMOROVE KALKULACIJE ♥♥");        
            Console.WriteLine("♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥");
        }

        private static string Unos(string poruka) // unos podataka
        {
            string unos;
            while (true)
            {
                Console.Write(poruka);
                unos = Console.ReadLine();
                
                if (unos.Trim().Length == 0)
                {
                    Console.WriteLine("Unos obavezan!");
                    continue;
                }

                return unos;
            }            
            
        }



    }
}
