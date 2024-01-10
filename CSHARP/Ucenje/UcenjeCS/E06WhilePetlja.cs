using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS
{
    internal class E06WhilePetlja
    {
        public static void Izvedi() 
        {
            bool Uvjet = true;
            int i = 0;

            while(Uvjet) 
            {
                
                Console.WriteLine(i);

                Uvjet = ++i < 10;
            }
            Console.WriteLine("-----------------");

            i = 0;
            while (i < 10)
            {
                Console.WriteLine(i);
                i++;
            }

            Console.WriteLine("-----------------");

            // continue

            i = 0;
            while(++i < 10) 
            {
                if(i == 2) // prilikom ispisa preskače se 2
                {
                    continue;
                }
                Console.WriteLine(i);
            }

            Console.WriteLine("-----------------");
            // break

            while (true) 
            {
                Console.WriteLine("Edunova");
                break;
            }

            Console.WriteLine("-----------------");

            // ugnježđivanje

            i = 0;
            while(++i < 10) 
            {
                while (true) 
                {
                    Console.WriteLine(i);
                    break;
                }
            }

            // Korisnik unosi broj
            // Program ispisuje sve brojeve od unesenog do 100
            // koristeći while petlju

            Console.Write("Unesi broj: ");
            int Broj = int.Parse(Console.ReadLine());

            Console.WriteLine(Broj);

            if (Broj < 100)
            {
                while (Broj <= 100)
                {
                    Console.WriteLine(Broj++);
                }
            }
            else
            {
                while (Broj >= 100)
                {
                    Console.WriteLine(Broj--);
                }
            }



        }
    }
}
