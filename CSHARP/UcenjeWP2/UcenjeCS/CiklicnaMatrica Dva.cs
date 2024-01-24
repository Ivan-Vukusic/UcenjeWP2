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
                                    
            int Br = 1; // brojač

            int Lijevo = Stupac - 1;
            int Gore = 0;
            int Desno = 0;
            int Dolje = Red - 1;

            //for (int Vp = 1; Vp < Stupac && Vp < Red; Vp++)
            //{
                
                    for (int i = 1; i <= Stupac; i++) // lijevo
                    {
                        Matrica[Lijevo, Stupac - i] = Br++;
                    }
                    //Vp++;

                    for (int i = 2; i <= Red; i++) // gore
                    {
                        Matrica[Red - i, Gore] = Br++;
                    }


                    for (int i = 1; i < Stupac; i++) // desno
                    {
                        Matrica[Desno, i] = Br++;
                    }


                    for (int i = 1; i < Red - 1; i++) // dolje
                    {
                        Matrica[i, Dolje] = Br++;
                    }
                    Lijevo--;
                    Gore++;
                    Desno++;
                    Dolje--;
                
            //}

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
