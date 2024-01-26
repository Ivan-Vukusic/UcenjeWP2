using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS
{
    internal class CiklicnaMatricaDva
    {
        public static void Izvedi()
        {
            Console.Write("Unesi broj redova: ");
            int Red = int.Parse(Console.ReadLine());

            Console.Write("Unesi broj stupaca: ");
            int Stupac = int.Parse(Console.ReadLine());

            int[,] Matrica = new int[Red, Stupac];
            
            
            int Brojac = 1;

            int vrh = 0;
            int dno = Red - 1;
            int lijevo = 0;
            int desno = Stupac - 1;

            for (; Brojac <= Red * Stupac;)
            {
                for (int i = desno; i >= lijevo; i--)
                    {
                        Matrica[dno, i] = Brojac++;
                    }
                dno--;

                for (int i = dno; i >= vrh; i--)
                    {
                        Matrica[i, lijevo] = Brojac++;
                    }
                lijevo++;

                if (Brojac <= Red * Stupac)
                {
                    for (int i = lijevo; i <= desno; i++)
                    {
                        Matrica[vrh, i] = Brojac++;
                    }
                }
                vrh++;

                if (Brojac <= Red * Stupac)
                {
                    for (int i = vrh; i <= dno; i++)
                    {
                        Matrica[i, desno] = Brojac++;
                    }
                }
                desno--;
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
