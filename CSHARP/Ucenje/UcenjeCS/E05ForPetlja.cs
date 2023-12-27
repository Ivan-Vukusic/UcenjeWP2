
namespace UcenjeCS
{
    internal class E05ForPetlja
    {
        public static void Izvedi() 
        {

            // Ispisati 10 puta Edunova
            // Najgore moguće rješenje
            //Console.WriteLine("Edunova");
            //Console.WriteLine("Edunova");
            //Console.WriteLine("Edunova");
            //Console.WriteLine("Edunova");
            //Console.WriteLine("Edunova");
            //Console.WriteLine("Edunova");
            //Console.WriteLine("Edunova");
            //Console.WriteLine("Edunova");
            //Console.WriteLine("Edunova");
            //Console.WriteLine("Edunova");


            // for (od kuda; do kuda; uvećanje/umanjenje)

            for (int i = 0; i < 100; i++) 
            {
                Console.WriteLine("Edunova");
            }


            // Varijabla izvan petlje
            int t;
            for (t = 0; t < 10; t++) 
            {
                Console.WriteLine("Edunova T");
            }

            // Varijabla u petlji mijenja vrijednost

            for(int i = 0; i < 10; i++) 
            {
                Console.WriteLine(i+1);
            }

            // Ne mora biti uvećanje, može biti umanjenje

            for(int i = 10; i>0; i--) 
            {
                Console.WriteLine(i);
            }

            // Korak uvećanja/umanjenja može biti veći od 1

            for(int i = 0; i < 20; i += 2) 
            {
                Console.WriteLine(i);
            }

            Console.WriteLine("*****************");
            // Ispisati sve parne brojeve između 3 i 23


            int ukpb = 56;
            int ukdb = 56;

            int manji = ukpb < ukdb ? ukpb : ukdb;
            int veci = ukpb > ukdb ? ukpb : ukdb;

            if (manji == veci && manji % 2 != 0)
            {
                Console.WriteLine("Unijeli ste iste brojeve, nema ispisa parnih brojeva");
            }

            for (int i = manji; i <= veci; i++) 
            {
                if (i % 2 == 0) 
                {
                    Console.WriteLine(i);
                }
            }

            Console.WriteLine("**************");

            for (int i =0; i < 10; i++)
            {
                for(int j = 0; j < 10; j++) 
                {
                    Console.Write((i+1) * (j+1) + " ");
                }
                Console.WriteLine();
            }

            // DZ popraviti formatiranje
            // DZ skužiti kako nasilno prekinuti vanjsku petlju unutrašnjom

            // Petlja se može preskočiti

            for(int i = 0; i < 10; i++) 
            {
                if(i % 3 == 0) 
                {
                    continue;
                }
                Console.WriteLine(i);
            }

            // Petlja se može nasilno prekinuti

            for(int i =0; i < 10; i++) 
            {
                if(i == 3) 
                {
                    break;
                }
                Console.WriteLine(i);
            }

            // Beskonačna petlja
            for(; ; ) 
            {
                Console.Write(new Random().Next(10,100) + " ");
                Console.Write(new Random().Next(10, 100) + " ");
                Console.Write(new Random().Next(10, 100) + " ");
                Console.Write(new Random().Next(10, 100) + " ");
                Console.Write(new Random().Next(10, 100) + " ");
                Console.Write(new Random().Next(10, 100) + " ");
                Console.Write(new Random().Next(10, 100) + " ");
                Thread.Sleep(50);
                break;
            }


            // Za uneseni broj između 1 i 10
            // ispiši taj broj na kvadrat

            //int broj;

            //for(; ; ) 
            //{
            //    Console.Write("Unesi broj između 1 i 10: ");    
            //    broj = int.Parse(Console.ReadLine());
            //    if (broj >= 1 && broj <= 10) 
            //    {
            //        break;
            //    }
            //    Console.WriteLine("Dragi korisniče, krivi unos!");
            //}
            //Console.WriteLine(broj*broj);
        }
    }
}
