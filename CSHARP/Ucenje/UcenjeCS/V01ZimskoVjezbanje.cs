
using System.Diagnostics.Metrics;
using System.Runtime.Intrinsics.X86;

namespace UcenjeCS
{
    internal class V01ZimskoVjezbanje
    {
        public static void Izvedi()
        {

            //Napisati program koji ispisuje sve brojeve od 1 do 100

            //for (int i = 0; i < 100; i++)
            //{
            //    Console.Write(i + 1 + " ");
            //}
            //Console.WriteLine();
            //Console.WriteLine("**********");

            //Napisati program koji ispisuje sve brojeve od 100 do 1

            //for (int i = 100; i > 0; i--)
            //{
            //    Console.Write(i + " ");
            //}
            //Console.WriteLine();
            //Console.WriteLine("**********");

            //Napisati program koji ispisuje sve brojeve od 1 do 100 koji su cjelobrojno djeljivi s 7

            //for (int i = 1; i <= 100; i++)
            //{
            //    if (i % 7 == 0)
            //    {
            //        Console.Write(i + " ");
            //    }
            //}
            //Console.WriteLine();
            //Console.WriteLine("**********");

            //Napisati program koji unosi brojeve sve dok ne unese broj veći od 100
            //a zatim ispisuje koliko je bilo pokušaja unosa

            //int count = 0;

            //Random broj = new Random();

            //for (int i = 0; i < 150; i++) 
            //{
            //    int n = broj.Next(1,150);                
            //    if (n > 100) 
            //    {
            //        break;                    
            //    }
            //    count++;
            //    Console.Write(n + " ");
            //}
            //Console.WriteLine();
            //Console.WriteLine("Broj ponavljanja je: " + count);



            
            
                Console.Write("Unesi prvi broj: ");
                int x = int.Parse(Console.ReadLine());
                Console.Write("Unesi drugi broj: ");
                int y = int.Parse(Console.ReadLine());

                int[,] Tablica = new int[x, y];

                for (int i = 1; i <= x; i++)
                {
                    for (int j = 1; j <= y; j++)
                    {
                        Console.Write((Tablica[i - 1, j - 1] = i * j) + "\t");
                    }
                    Console.WriteLine();
                }
            

        }
    } 

}
