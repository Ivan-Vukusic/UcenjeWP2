using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcenjeCS.KonzolnaAppDeratizacija.Model;

namespace UcenjeCS.KonzolnaAppDeratizacija
{
    internal class Program
    {

        private List<Termin> Termini;
        private List<Djelatnik> Djelatnici;
        private List<Otrov> Otrovi;
        private List<Objekt> Objekti;

        public Program()
        {
            Termini = new List<Termin>();
            Djelatnici = new List<Djelatnik>();
            Otrovi = new List<Otrov>();
            Objekti = new List<Objekt>();
            Naslov();
            Izbornik();
        }

        private void Naslov()
        {
            Console.WriteLine("=========================================");
            Console.WriteLine("|| DERATIZACIJA KONZOLNA APLIKACIJA v1 ||");
            Console.WriteLine("=========================================");
        }

        // Glavni izbornik
        private void Izbornik()
        {
            Console.WriteLine();
            Console.WriteLine("IZBORNIK");
            Console.WriteLine();
            Console.WriteLine("1. Termini");
            Console.WriteLine("2. Djelatnici");
            Console.WriteLine("3. Otrovi");
            Console.WriteLine("4. Objekti");
            Console.WriteLine("5. Izlaz iz programa");
            OdabirStavkeGlavnogIzbornika();

        }

        private void OdabirStavkeGlavnogIzbornika()
        {
            switch (Pomocno.UcitajInt("Odaberite stavku izbornika: "))
            {
                case 1:
                    Console.WriteLine("Rad s terminima");
                    IzbornikTermini();
                    break;
                case 2:
                    Console.WriteLine("Rad s djelatnicima");
                    //IzbornikDjelatnici();
                    break;
                case 3:
                    Console.WriteLine("Rad s otrovima");
                    //IzbornikOtrovi();
                    break;
                case 4:
                    Console.WriteLine("Rad s objektima");
                    //IzbornikObjekti();
                    break;
                case 5:
                    Console.WriteLine("Izlaz iz programa");
                    break;
                default:
                    Console.WriteLine("Krivi odabir");
                    Izbornik();
                    break;

            }
        }

        // Izbornik termina
        private void IzbornikTermini()
        {
            Console.WriteLine();
            Console.WriteLine("TERMINI");
            Console.WriteLine();
            Console.WriteLine("1. Prikaži termine");
            Console.WriteLine("2. Dodaj termin");
            Console.WriteLine("3. Uredi termin");
            Console.WriteLine("4. Briši termin");
            Console.WriteLine("5. Povratak u glavni izbornik");
            OdabirStavkeIzbornikaTermini();
        }

        private void OdabirStavkeIzbornikaTermini()
        {
            switch (Pomocno.UcitajInt("Odaberite stavku izbornika: "))
            {
                case 1:
                    Console.WriteLine("Prikaži sve termine: ");
                    PrikaziTermine();
                    IzbornikTermini();
                    break;
                case 2:
                    Console.WriteLine("Dodaj termin: ");
                    DodajTermin();
                    break;
                case 3:
                    Console.WriteLine("Uredi termin: ");
                    UrediTermin();
                    break;
                case 4:
                    Console.WriteLine("");
                    BrisiTermin();
                    break;
                case 5:
                    Console.WriteLine("Povratak u glavni izbornik");
                    Izbornik();
                    break;
                default:
                    Console.WriteLine("Krivi odabir");
                    OdabirStavkeIzbornikaTermini();
                    break;

            }
        }        

        private void PrikaziTermine()
        {
            Console.WriteLine("Termini");
            Console.WriteLine();
            var i = 0;
            Termini.ForEach(t =>
            {
                Console.WriteLine(++i + "." + t);
            });

            if(Termini.Count == 0) 
            {
                Console.WriteLine("Nema termina");
            }
            Console.WriteLine("==========");
        }

        private void DodajTermin()
        {
            Termini.Add(new Termin()
            {
                Sifra = Pomocno.UcitajInt("Unesi šifru termina: "),
                Datum = Pomocno.UcitajDatum("Unesi datum termina: ","Greška"),
                Djelatnik = Pomocno.UcitajString("Unesi djelatnika: "),
                Otrov = Pomocno.UcitajString("Unesi otrov: "),
                Objekt = Pomocno.UcitajString("Unesi objekt: "),
                Napomena = Pomocno.UcitajString("Dodaj napomenu: ")
            });
            Console.WriteLine();
            IzbornikTermini();
        }

        private void UrediTermin()
        {
            PrikaziTermine();
            var t = Termini[Pomocno.UcitajInt("Odaberi termin za izmjenu: ") - 1];
            t.Sifra = Pomocno.UcitajInt(t.Sifra + ", Unesi novu šifru: ");
            t.Datum = Pomocno.UcitajDatum(t.Datum + ", Unesi novi datum: ");
            t.Djelatnik = Pomocno.UcitajString(t.Djelatnik + ", Unesi novog djelatnika: ");
            t.Otrov = Pomocno.UcitajString(t.Otrov + ", Unesi novi otrov: ");
            t.Objekt = Pomocno.UcitajString(t.Objekt + ", Unesi novi objekt: ");
            Console.WriteLine();
            IzbornikTermini();
        }

        private void BrisiTermin()
        {
            PrikaziTermine();
            Termini.RemoveAt(Pomocno.UcitajInt("Odaberi termin za brisanje") - 1);
            Console.WriteLine();
            IzbornikTermini();
        }


        // CRUD termina odrađen, unijeti ostale



    }
}
