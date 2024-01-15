using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS
{
    internal class CiklicnaMatricaDva
    {
        public static void Izvedi() // Ciklična matrica - kretanje u smjeru kazaljke - kretanje dolje desno
        {
            Console.Write("Unesi broj redova: "); // upis broja redova
            int Red = int.Parse(Console.ReadLine());

            Console.Write("Unesi broj stupaca: "); // upis broja stupaca
            int Stupac = int.Parse(Console.ReadLine());

            int[,] Matrica = new int[Red, Stupac]; // definiranje matrice
                                    
            int br = 1; // brojač

            int x = 1;
            int y = 2;
            int z = 3;
            int w = 0;


            for (int i = 1; i <= Stupac; i++) // lijevo
            {
                Matrica[Red - 1, Stupac - i] = br++;
            }


            for (int i = 2; i <= Red; i++) // gore
            {
                Matrica[Red - i, 0] = br++;
            }


            for (int i = 1; i < Stupac; i++) // desno
            {
                Matrica[0, i] = br++;
            }


            for (int i = 1; i < Red - 1; i++) // dolje
            {
                Matrica[i, Stupac - 1] = br++;
            }


            Console.WriteLine();
            for (int i = 0; i < Red; i++)
            {
                for (int j = 0; j < Stupac; j++)
                {
                    Console.Write(Matrica[i, j] + "\t");
                }
                Console.WriteLine();
            }


        }
    }
}
