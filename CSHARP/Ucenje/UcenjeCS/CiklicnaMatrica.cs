using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS
{
    internal class CiklicnaMatrica
    {
        public static void Izvedi() 
        {
            Console.Write("Unesi broj redova: "); // upis broja redova
            int Rd = int.Parse(Console.ReadLine());

            Console.Write("Unesi broj stupaca: "); // upis broja stupaca
            int St = int.Parse(Console.ReadLine());

            
            int Br = 1; // brojač


            int[,] Matrica = new int[Rd, St]; // definiranje matrice
                        
            
            for (int i = 1; i <= St; i++)
            {
                Matrica[Rd - 1, St - i] = Br++; // lijevo              
            }

            for (int i = 2; i <= Rd; i++)
            {
                Matrica[Rd - i, 0] = Br++; // gore               
            }

            for (int i = 1; i < St; i++)
            {
                Matrica[0, i] = Br++; // desno 
            }

            for (int i = 1; i < Rd - 1; i++)
            {
                Matrica[i, St - 1] = Br++; // dolje
            }
            
            Console.WriteLine();
            for (int i = 0; i < Rd; i++)
            {
                for (int j = 0; j < St; j++)
                {
                    Console.Write(Matrica[i, j] + "\t");
                }
                Console.WriteLine();
            }

        }
    }
}
