using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.KonzolnaAppDeratizacija
{
    internal class Program
    {
        public Program() 
        {
            Naslov();
            Izbornik();
        }

        private void Izbornik()
        {
            Console.WriteLine("IZBORNIK");
            Console.WriteLine();
            Console.WriteLine("1. Termini");
            Console.WriteLine("2. Djelatnici");
            Console.WriteLine("3. Otrovi");
            Console.WriteLine("4. Objekti");
            Console.WriteLine("5. Izlaz iz programa");
                        
        }

        private void Naslov()
        {
            Console.WriteLine("=========================================");
            Console.WriteLine("|| DERATIZACIJA KONZOLNA APLIKACIJA v1 ||");
            Console.WriteLine("=========================================");
        }
    }
}
