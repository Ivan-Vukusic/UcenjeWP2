using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS
{
    internal class E10ObradaIznimki
    {
        public static void Izvedi()
        {
            int pb = UcitajBroj("Unesi prvi broj: ");
            int db = UcitajBroj("Daj mi i drugi: ");


            IspisiBrojeve(pb, db);



        }

        private static void IspisiBrojeve(int pb, int db)
        {
            var Manji = pb<=db ? pb : db;
            var Veci = pb>=db ? pb : db;

            for(int i = Manji; i <=Veci; i++)
            {
                Console.WriteLine(i);
            }
            
        }

        private static int UcitajBroj(string v)
        {
            for (; ; )
            {
                Console.Write(v);
                try
                {
                    return int.Parse(Console.ReadLine());
                }
                catch (FormatException)
                {
                    Console.WriteLine("Nisi unio broj");
                }
                catch(OverflowException)
                {
                    Console.WriteLine("Nešto gadno ne valja");
                }
                // može se još uhvatiti ArgumentNullException
                catch(Exception) // hvata se svaka iznimka koja nije prethodno definirana
                {
                    Console.WriteLine("Oooooops");
                }
                finally 
                {
                    Console.WriteLine("Mjesto na koje se dolazi, pukao ti ili ne");
                }



            }


            //return 0;
        }
    }
}
