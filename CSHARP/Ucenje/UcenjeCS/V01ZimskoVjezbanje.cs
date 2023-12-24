
using System.Runtime.Intrinsics.X86;

namespace UcenjeCS
{
    internal class V01ZimskoVjezbanje
    {
        public static void Izvedi()
        {

            //Napisati program koji ispisuje sve brojeve od 1 do 100

            for (int i = 0; i <= 100; i++)
            {
                Console.WriteLine(i + 1);
            }


            //Napisati program koji ispisuje sve brojeve od 100 do 1

            for (int i = 100; i > 0; i--)
            {
                Console.WriteLine(i);
            }


            //Napisati program koji ispisuje sve brojeve od 1 do 100 koji su cjelobrojno djeljivi s 7

            for (int i = 1; i <= 100; i++)
            {
                if (i % 7 == 0)
                {
                    Console.WriteLine(i);
                }
            }
        }
}   }
