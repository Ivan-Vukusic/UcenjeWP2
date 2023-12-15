namespace UcenjeCS
{
    internal class E02VarijableTipoviPodatakaOperatori
    {

        public static void Izvedi() 
        {

           int Varijabla = 3;

            Console.WriteLine(Varijabla);

            int i=1, j=0, k;

            Console.WriteLine("{0},{1}",i,j);

            bool Istina = i == 1;

            Console.WriteLine(Istina);

            double Broj = 4.89;
            decimal VeciBroj = 2.99M;

            // Brojevi se nalaze na brojevnoj kružnici
            Console.WriteLine(int.MaxValue);
            int Mb = int.MaxValue;
            Console.WriteLine(Mb+1);

            i = 3; j = 2; k = 1;

            Console.WriteLine(i+j); // zbrajanje
            Console.WriteLine(i-j); // oduzimanje
            Console.WriteLine(i*j); // množenje
            Console.WriteLine(i/j); // dijeljenje
            Console.WriteLine((float)i/j); // dijeljenje s decimalnim rezultatom

            // za dvoznamenkasti broj ispišu prvu znamenku
            int Db = 52;
            Console.WriteLine(Db/10);

            bool Uvjet = i > j;
            Uvjet = i >= j;
            Uvjet = i <= j;
            Uvjet = i < j;
            Uvjet = i == j; // provjera jednakosti
            Uvjet = i != j; // provjera nejednakosti


            // operator modulo
            // ostatak nakon cjelobrojnog dijeljenja

            int Ostatak = 9 % 2;

            // za dvoznamenkasti broj ispiši vrijednost jedinice
            Console.WriteLine(52%10);

            i = 1;
            Console.WriteLine(i); // 1
            i = i + 1; // uvećavam za 1
            Console.WriteLine(i); // 2
            i += 1; // uvećavam za 1
            Console.WriteLine(i); // 3
            i++; // uvećavam za 1
            Console.WriteLine(i); //4

            // specifičnosti inkrementa ++
            // i++ prvo koristi trenutnu vrijednost pa onda uveća
            Console.WriteLine(i++); //4
            Console.WriteLine(i); //5
            // ++i prvo uveća pa onda koristi
            Console.WriteLine(++i); //6
            Console.WriteLine(i); //6

            // SVE VRIJEDI ISTOVJETNO I ZA DEKREMENT (--)


            int t = 1, l = 2;
            Console.WriteLine("t={0},l={1}",t,l);
            t = ++t - l; // t = 0, l = 2
            Console.WriteLine("t={0},l={1}", t, l);
            l -= t - l; // t = 0, l = 4
            Console.WriteLine("t={0},l={1}", t, l);
            Console.WriteLine(++t - --l); // 1 - 3
            Console.WriteLine("t={0},l={1}", t, l);

            // Ovo vježbati doma  na način
            //Prvo si postaviti zadatak pa ga nakon 15 minuta riješiti



        }

    }

}
