using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.E15KonzolnaAplikacija
{
    internal class Pomocno
    {
        public static int UcitajInt(string poruka)
        {
            for(; ; )
            {
                Console.Write(poruka);
                try
                {
                    return int.Parse(Console.ReadLine());
                }
                catch
                {
                    Console.WriteLine("Neispravan unos");
                }
                    
            }
            
        }
        public static string UcitajString(string poruka)
        {
            string s; 
            while (true)
            {
                Console.Write(poruka);
                s = Console.ReadLine();
                if(s.Trim().Length == 0)
                {
                    Console.WriteLine("Obavezan unos");
                    continue;
                }
                return s;
            }
        }

        internal static float ucitajDecimalniBroj(string poruka, string greska)
        {
            float b;
            while (true)
            {
                Console.Write(poruka);
                try
                {
                    b = float.Parse(Console.ReadLine());
                    if (b > 0)
                    {
                        return b;
                    }
                    Console.WriteLine(greska);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(greska);
                }
            }
        }

        internal static bool ucitajBool(string poruka)
        {
            Console.Write(poruka);
            return Console.ReadLine().Trim().ToLower().Equals("da") ? true : false;
        }

    }
}
