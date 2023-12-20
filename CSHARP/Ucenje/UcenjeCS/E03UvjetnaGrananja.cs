
namespace UcenjeCS
{
    internal class E03UvjetnaGrananja
    {
        public static void Izvedi() 
        {
            int i = 7; // Namjerno ne radim čitanje iz konzole kako bi dobili na vremenu

            // Binarno grananje

            bool Uvjet = i == 7;

            // Uvjet ima vrijednost True
            if (Uvjet) 
            {
                Console.WriteLine($"Broj je {i}, ušli smo True dio if naredbe");


                // Ovo gore i sada sljedeće je minimalni dio if naredbe
                // inače se u pravilu ovako piše  
                if (i == 7) 
                {
                    Console.WriteLine("Isti uvjet kao i prethodno");
                }

                //drugi dio if naredbe (neobavezni) else
                if (i < 5)
                {
                    Console.WriteLine("i je manje od 5");
                }
                else 
                {
                    Console.WriteLine("i nije manje od 5");
                }


                // Puni izgled if naredbe
                if (i == 2)
                {
                    Console.WriteLine("i je 2");
                }
                else if (i == 3)
                {
                    Console.WriteLine(3);
                }
                else 
                {
                    Console.WriteLine("i nije 2 niti 3");
                }

                int j = 2;
                if (i == 7) 
                {
                    if (j == 2) 
                    {
                        Console.WriteLine("Oba uvjeta su zadovoljena nested");
                    }
                }


                // Korištenje logičkih operatora
                // logičko i, uvjetovano i
                i = 5;
                if(i == 7 & j == 2)  
                { 
                    Console.WriteLine("Oba uvjeta su zadovoljena");
                }
                    
                // & provjeravaju se oba uvjeta bez obzira ako se na prvom padne (False)

                if(i == 7 && j == 2) 
                {
                    Console.WriteLine("Oba uvjeta su zadovoljena");
                }

                // && ukoliko padne (False) na prvom uvjetu ne provjerava se drugi


                // logičko | i uvjetovano ||

                if (i == 5 | j == 1) 
                {
                    Console.WriteLine("Dovoljno je da jedan od uvjeta bude zadovoljen");
                }

                // | provjerava oba uvjeta bez obzira ako je prvi prošao (True)

                if (i == 5 || j == 1) 
                {
                    Console.WriteLine("Prvi uvjet zadovoljen, drugi se ne provjerava");
                }

                // || ukoliko prvi uvjet prođe (True) drugi se ne provjerava

                // logičko NE (!)

                if((i==5 || j==1) && !(i>5 || j < 8)) 
                {
                    Console.WriteLine("Komplicirani izraz");
                }

                // skraćeni način pisanja: inline IF

                // program upisuje cijeli broj
                // ako je broj veći od 10 ispisuje Osijek
                // inače ispisuje Zagreb

                Console.Write("Unesi cijeli broj: ");
                int Broj = int.Parse(Console.ReadLine());
                if (Broj > 10) 
                {
                    Console.WriteLine("Osijek");
                }
                else 
                {
                    Console.WriteLine("Zagreb");
                }

                // U slučaju istog ponašanja sa različitim vrijednostima
                // u IF i ELSE dijelu

                // inline IF
                Console.WriteLine(i>10 ? "Osijek" : "Zagreb");


                // višestruko grananje SWITCH
                
                int ocjena = 4;

                switch (ocjena) 
                {
                    case 1:
                        Console.WriteLine("Nedovoljan");
                        break;
                    case 2:
                        case 3:
                        Console.WriteLine("Dovoljan ili dobar");
                        break;
                    case 4: case 5:
                        Console.WriteLine("To je ocjena");
                        break;
                    default:
                        Console.WriteLine("Nije ocjena");
                        break;
                }


                string ime = "Pero";
                switch (ime) 
                {
                    case "Marko":
                        Console.WriteLine("OK");
                        break;
                    case "Pero":
                        Console.WriteLine("Super");
                        break;
                }

            }

        }
    }
}
