using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.LjubavniKalkulator
{
    internal class Program
    {
        
        public static void Izvedi()
        {                       
            Console.WriteLine(new Kalkulator(Unos("Unesi prvo ime: "), Unos("Unesi drugo ime: ")).Rezultat());
        }

        private static string Unos(string poruka)
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
