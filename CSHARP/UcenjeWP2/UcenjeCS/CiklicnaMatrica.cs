using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS
{
    internal class CiklicnaMatrica
    {
        public static void Izvedi() // Ciklična matrica - kretanje u smjeru kazaljke - kretanje dolje desno
        {
            Console.Write("Unesi broj redova: "); // upis broja redova
            int Rd = int.Parse(Console.ReadLine());

            Console.Write("Unesi broj stupaca: "); // upis broja stupaca
            int St = int.Parse(Console.ReadLine());

            int[,] Matrica = new int[Rd, St]; // definiranje matrice

            int RdP = 0;      // početak reda
            int RdK = St - 1; // kraj reda
            int StP = 0;      // početak stupca
            int StK = Rd - 1; // kraj stupca
            
            int br = 1; // brojač

            while (RdP <= RdK && StP <= StK)
            {
                for (int i = RdK; i >= RdP; i--)
                {
                    Matrica[StK, i] = br++;
                }
                StK--;

                for (int i = StK; i >= StP; i--)
                {
                    Matrica[i, RdP] = br++;
                }
                RdP++;

                if (StP <= StK)
                {
                    for (int i = RdP; i <= RdK; i++)
                    {
                        Matrica[StP, i] = br++;
                    }                    
                }
                StP++;

                if (RdP <= RdK)
                {
                    for (int i = StP; i <= StK; i++)
                    {
                        Matrica[i, RdK] = br++;
                    }                    
                }
                RdK--;
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
