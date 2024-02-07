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
        private List<Vrsta> Vrste;
        private List<Djelatnik> Djelatnici;
        private List<Otrov> Otrovi;
        private List<Objekt> Objekti;        
        private List<Termin> Termini;

        public Program()
        {
            Vrste = new List<Vrsta>();            
            Djelatnici = new List<Djelatnik>();
            Otrovi = new List<Otrov>();
            Objekti = new List<Objekt>();
            Termini = new List<Termin>();
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
            Console.WriteLine("5. Vrste objekata");
            Console.WriteLine("6. Izlaz iz programa");
            Console.WriteLine();
            OdabirStavkeGlavnogIzbornika();
        }

        private void OdabirStavkeGlavnogIzbornika()
        {
            switch (Pomocno.UcitajInt("Odaberite stavku izbornika: "))
            {
                case 1:
                    Console.WriteLine();
                    IzbornikTermini();
                    break;
                case 2:
                    Console.WriteLine();
                    IzbornikDjelatnici();
                    break;
                case 3:
                    Console.WriteLine();
                    IzbornikOtrovi();
                    break;
                case 4:
                    Console.WriteLine();
                    IzbornikObjekti();
                    break;
                case 5:
                    Console.WriteLine();
                    IzbornikVrsteObjekata();
                    break;
                case 6:
                    Console.WriteLine();
                    Console.WriteLine("THE END");
                    break;
                default:
                    Console.WriteLine();
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
            Console.WriteLine();
            OdabirStavkeIzbornikaTermini();
        }

        private void OdabirStavkeIzbornikaTermini()
        {
            switch (Pomocno.UcitajInt("Odaberite stavku izbornika: "))
            {
                case 1:
                    Console.WriteLine();
                    Console.WriteLine("Prikaži sve termine: ");
                    PrikaziTermine();
                    IzbornikTermini();
                    break;
                case 2:
                    Console.WriteLine();
                    Console.WriteLine("Dodaj termin: ");
                    DodajTermin();
                    break;
                case 3:
                    Console.WriteLine();
                    Console.WriteLine("Uredi termin: ");
                    UrediTermin();
                    break;
                case 4:
                    Console.WriteLine();
                    Console.WriteLine("Obriši termin: ");
                    BrisiTermin();
                    break;
                case 5:
                    Console.WriteLine();
                    Console.WriteLine("Povratak u glavni izbornik");
                    Izbornik();
                    break;
                default:
                    Console.WriteLine();
                    Console.WriteLine("Krivi odabir");
                    OdabirStavkeIzbornikaTermini();
                    break;

            }
        }

        private void PrikaziTermine()
        {
            Console.WriteLine();
            Console.WriteLine("Termini");
            Console.WriteLine();
            var i = 0;
            Termini.ForEach(t =>
            {
                Console.WriteLine(++i + "." + t);
            });

            if (Termini.Count == 0)
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
                Datum = Pomocno.UcitajDatum("Unesi datum termina(format dd.mm.yyyy.): ", "Greška"),
                Djelatnici = PostaviDjelatnike(),
                Otrovi = PostaviOtrove(),
                Objekti = PostaviObjekte(),
                Napomena = Pomocno.UcitajString("Dodaj napomenu: ")
            });
            Console.WriteLine();
            IzbornikTermini();
        }
        
        private void UrediTermin()
        {
            PrikaziTermine();
            int Index = Pomocno.UcitajBrojRaspon("Odaberi redni broj termina: ", "Nije dobar odabir", 1, Termini.Count());
            var t = Termini[Index - 1];
            t.Sifra = Pomocno.UcitajInt(t.Sifra + ", Unesi novu šifru: ");
            Console.WriteLine("==========");
            t.Datum = Pomocno.UcitajDatum(t.Datum + ", Unesi novi datum: ", "Greška");
            Console.WriteLine("==========");
            t.Djelatnici = PostaviDjelatnike();
            
            int b = 1;
            
            foreach (Djelatnik djelatnik in t.Djelatnici)
            {
                Console.WriteLine("{0}. {1}", b++, djelatnik);
            }
            Console.WriteLine("==========");
            
            t.Otrovi = PostaviOtrove();

            int d = 1;
            foreach (Otrov otrov in t.Otrovi)
            {
                Console.WriteLine("{0}. {1}", d++, otrov);
            }
            Console.WriteLine("==========");

            t.Objekti = PostaviObjekte();
            
            int c = 1;
            foreach(Objekt objekt in t.Objekti)
            {
                Console.WriteLine("{0}. {1}", c++, objekt);
            }
            Console.WriteLine("==========");
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

        // Izbornik djelatnika

        private void IzbornikDjelatnici()
        {
            Console.WriteLine();
            Console.WriteLine("DJELATNICI");
            Console.WriteLine();
            Console.WriteLine("1. Prikaži djelatnike");
            Console.WriteLine("2. Dodaj djelatnika");
            Console.WriteLine("3. Uredi djelatnika");
            Console.WriteLine("4. Briši djelatnika");
            Console.WriteLine("5. Povratak u glavni izbornik");
            Console.WriteLine();
            OdabirStavkeIzbornikaDjelatnici();
        }

        private void OdabirStavkeIzbornikaDjelatnici()
        {
            switch (Pomocno.UcitajInt("Odaberite stavku izbornika: "))
            {
                case 1:
                    Console.WriteLine();
                    Console.WriteLine("Prikaži sve djelatnike: ");
                    PrikaziDjelatnike();
                    IzbornikDjelatnici();
                    break;
                case 2:
                    Console.WriteLine();
                    Console.WriteLine("Dodaj djelatnika: ");
                    DodajDjelatnika();
                    break;
                case 3:
                    Console.WriteLine();
                    Console.WriteLine("Uredi djelatnika: ");
                    UrediDjelatnika();
                    break;
                case 4:
                    Console.WriteLine();
                    Console.WriteLine("Obriši djelatnika");
                    BrisiDjelatnika();
                    break;
                case 5:
                    Console.WriteLine();
                    Console.WriteLine("Povratak u glavni izbornik");
                    Izbornik();
                    break;
                default:
                    Console.WriteLine();
                    Console.WriteLine("Krivi odabir");
                    OdabirStavkeIzbornikaDjelatnici();
                    break;

            }
        }

        private void PrikaziDjelatnike()
        {
            Console.WriteLine();
            Console.WriteLine("Djelatnici");
            Console.WriteLine();
            var i = 0;
            Djelatnici.ForEach(d =>
            {
                Console.WriteLine(++i + "." + d);
            });

            if (Djelatnici.Count == 0)
            {
                Console.WriteLine("Nema djelatnika");
            }
            Console.WriteLine("==========");
        }

        private void DodajDjelatnika()
        {
            Djelatnici.Add(new Djelatnik()
            {
                Sifra = Pomocno.UcitajInt("Unesi šifru djelatnika: "),
                Ime = Pomocno.UcitajString("Unesi ime djelatnika: "),
                Prezime = Pomocno.UcitajString("Unesi prezime djelatnika: "),
                BrojMobitela = Pomocno.UcitajString("Unesi broj mobitela djelatnika: "),
                Oib = Pomocno.UcitajString("Unesi oib djelatnika: "),
                Struka = Pomocno.UcitajString("Unesi struku djelatnika: ")
            });
            Console.WriteLine();
            IzbornikDjelatnici();
        }

        private void UrediDjelatnika()
        {
            PrikaziDjelatnike();
            var d = Djelatnici[Pomocno.UcitajInt("Odaberi djelatnika za izmjenu: ") - 1];
            d.Sifra = Pomocno.UcitajInt(d.Sifra + ", Unesi novu šifru: ");
            d.Ime = Pomocno.UcitajString(d.Ime + ", Unesi novo ime: ");
            d.Prezime = Pomocno.UcitajString(d.Prezime + ", Unesi novo prezime: ");
            d.BrojMobitela = Pomocno.UcitajString(d.BrojMobitela + ", Unesi novi broj mobitela: ");
            d.Oib = Pomocno.UcitajString(d.Oib + ", Unesi novi oib: ");
            d.Struka = Pomocno.UcitajString(d.Struka + ", Unesi novu struku: ");
            Console.WriteLine();
            IzbornikDjelatnici();
        }

        private void BrisiDjelatnika()
        {
            PrikaziDjelatnike();
            Djelatnici.RemoveAt(Pomocno.UcitajInt("Odaberi djelatnika za brisanje") - 1);
            Console.WriteLine();
            IzbornikDjelatnici();
        }

        private List<Djelatnik> PostaviDjelatnike()
        {
            List<Djelatnik> djelatnici = new List<Djelatnik>();
            while (Pomocno.UcitajBool("Želite li dodati djelatnike? (da ili bilo što drugo za ne): "))
            {
                djelatnici.Add(PostaviDjelatnika());
            }
            return djelatnici;
        }

        private Djelatnik PostaviDjelatnika()
        {
            PrikaziDjelatnike();
            int Index = Pomocno.UcitajBrojRaspon("Odaberi redni broj djelatnika: ", "Nije dobar odabir", 1, Djelatnici.Count());
            return Djelatnici[Index - 1];
        }


        // Izbornik otrova

        private void IzbornikOtrovi()
        {
            Console.WriteLine();
            Console.WriteLine("OTROVI");
            Console.WriteLine();
            Console.WriteLine("1. Prikaži otrove");
            Console.WriteLine("2. Dodaj otrov");
            Console.WriteLine("3. Uredi otrov");
            Console.WriteLine("4. Briši otrov");
            Console.WriteLine("5. Povratak u glavni izbornik");
            Console.WriteLine();
            OdabirStavkeIzbornikaOtrovi();
        }

        private void OdabirStavkeIzbornikaOtrovi()
        {
            switch (Pomocno.UcitajInt("Odaberite stavku izbornika: "))
            {
                case 1:
                    Console.WriteLine();
                    Console.WriteLine("Prikaži sve otrove: ");
                    PrikaziOtrove();
                    IzbornikOtrovi();
                    break;
                case 2:
                    Console.WriteLine();
                    Console.WriteLine("Dodaj otrov: ");
                    DodajOtrov();
                    break;
                case 3:
                    Console.WriteLine();
                    Console.WriteLine("Uredi otrov: ");
                    UrediOtrov();
                    break;
                case 4:
                    Console.WriteLine();
                    Console.WriteLine("Obriši otrov");
                    BrisiOtrov();
                    break;
                case 5:
                    Console.WriteLine();
                    Console.WriteLine("Povratak u glavni izbornik");
                    Izbornik();
                    break;
                default:
                    Console.WriteLine();
                    Console.WriteLine("Krivi odabir");
                    OdabirStavkeIzbornikaOtrovi();
                    break;

            }
        }

        private void PrikaziOtrove()
        {
            Console.WriteLine();
            Console.WriteLine("Otrovi");
            Console.WriteLine();
            var i = 0;
            Otrovi.ForEach(ot =>
            {
                Console.WriteLine(++i + "." + ot);
            });

            if (Otrovi.Count == 0)
            {
                Console.WriteLine("Nema otrova");
            }
            Console.WriteLine("==========");
        }

        private void DodajOtrov()
        {
            Otrovi.Add(new Otrov()
            {
                Sifra = Pomocno.UcitajInt("Unesi šifru otrova: "),
                Naziv = Pomocno.UcitajString("Unesi naziv otrova: "),
                AktivnaTvar = Pomocno.UcitajString("Unesi aktivnu tvar: "),
                Kolicina = Pomocno.UcitajDecimalniBroj("Unesi kolicinu otrova: ", ""),
                CasBroj = Pomocno.UcitajString("Unesi CAS broj otrova: ")
            });
            Console.WriteLine();
            IzbornikOtrovi();
        }

        private void UrediOtrov()
        {
            PrikaziOtrove();
            var ot = Otrovi[Pomocno.UcitajInt("Odaberi otrov za izmjenu: ") - 1];
            ot.Sifra = Pomocno.UcitajInt(ot.Sifra + ", Unesi novu šifru: ");
            ot.Naziv = Pomocno.UcitajString(ot.Naziv + ", Unesi novi naziv: ");
            ot.AktivnaTvar = Pomocno.UcitajString(ot.AktivnaTvar + ", Unesi novu aktivnu tvar: ");
            ot.Kolicina = Pomocno.UcitajDecimalniBroj(ot.Kolicina + ", Unesi novu količinu: ", "");
            ot.CasBroj = Pomocno.UcitajString(ot.CasBroj + ", Unesi novi CAS broj: ");
            Console.WriteLine();
            IzbornikOtrovi();
        }

        private void BrisiOtrov()
        {
            PrikaziOtrove();
            Otrovi.RemoveAt(Pomocno.UcitajInt("Odaberi otrov za brisanje") - 1);
            Console.WriteLine();
            IzbornikOtrovi();
        }

        private List<Otrov> PostaviOtrove()
        {
            List<Otrov> otrovi = new List<Otrov>();
            while (Pomocno.UcitajBool("Želite li dodati otrove? (da ili bilo što drugo za ne): "))
            {
                otrovi.Add(PostaviOtrov());
            }
            return otrovi;
        }

        private Otrov PostaviOtrov()
        {
            PrikaziOtrove();
            int Index = Pomocno.UcitajBrojRaspon("Odaberi redni broj otrova: ", "Nije dobar odabir", 1, Otrovi.Count());
            return Otrovi[Index - 1];
        }

        // Izbornik objekti

        private void IzbornikObjekti()
        {
            Console.WriteLine();
            Console.WriteLine("OBJEKTI");
            Console.WriteLine();
            Console.WriteLine("1. Prikaži objekte");
            Console.WriteLine("2. Dodaj objekt");
            Console.WriteLine("3. Uredi objekt");
            Console.WriteLine("4. Briši objekt");
            Console.WriteLine("5. Povratak u glavni izbornik");
            Console.WriteLine();
            OdabirStavkeIzbornikaObjekti();
        }

        private void OdabirStavkeIzbornikaObjekti()
        {
            switch (Pomocno.UcitajInt("Odaberite stavku izbornika: "))
            {
                case 1:
                    Console.WriteLine();
                    Console.WriteLine("Prikaži sve objekte: ");
                    PrikaziObjekte();
                    IzbornikObjekti();
                    break;
                case 2:
                    Console.WriteLine();
                    Console.WriteLine("Dodaj objekt: ");
                    DodajObjekt();
                    break;
                case 3:
                    Console.WriteLine();
                    Console.WriteLine("Uredi objekt: ");
                    UrediObjekt();
                    break;
                case 4:
                    Console.WriteLine();
                    Console.WriteLine("Obriši objekt");
                    BrisiObjekt();
                    break;
                case 5:
                    Console.WriteLine();
                    Console.WriteLine("Povratak u glavni izbornik");
                    Izbornik();
                    break;
                default:
                    Console.WriteLine("Krivi odabir");
                    OdabirStavkeIzbornikaObjekti();
                    break;

            }
        }

        private void PrikaziObjekte()
        {
            Console.WriteLine();
            Console.WriteLine("Objekti");
            Console.WriteLine();
            var i = 0;
            Objekti.ForEach(ob =>
            {
                Console.WriteLine(++i + "." + ob);
            });

            if (Objekti.Count == 0)
            {
                Console.WriteLine("Nema objekata");
            }
            Console.WriteLine("==========");
        }

        private void DodajObjekt()
        {
            Objekti.Add(new Objekt()
            {
                Sifra = Pomocno.UcitajInt("Unesi šifru objekta: "),
                Mjesto = Pomocno.UcitajString("Unesi naziv mjesta: "),
                Adresa = Pomocno.UcitajString("Unesi adresu objekta: "),
                Vrste = PostaviVrsteObjekata()
            });
            Console.WriteLine();
            IzbornikObjekti();
        }
        
        private void UrediObjekt()
        {
            PrikaziObjekte();
            var ob = Objekti[Pomocno.UcitajInt("Odaberi objekt za izmjenu: ") - 1];
            ob.Sifra = Pomocno.UcitajInt(ob.Sifra + ", Unesi novu šifru: ");
            ob.Mjesto = Pomocno.UcitajString(ob.Mjesto + ", Unesi novo mjesto: ");
            ob.Adresa = Pomocno.UcitajString(ob.Adresa + ", Unesi novu adresu: ");
            ob.Vrste = PostaviVrsteObjekata();
            Console.WriteLine();
            IzbornikObjekti();
        }

        private void BrisiObjekt()
        {
            PrikaziObjekte();
            Objekti.RemoveAt(Pomocno.UcitajInt("Odaberi objekt za brisanje") - 1);
            Console.WriteLine();
            IzbornikObjekti();
        }

        private List<Objekt> PostaviObjekte()
        {
            List<Objekt> objekti = new List<Objekt>();
            while (Pomocno.UcitajBool("Želite li dodati objekte? (da ili bilo što drugo za ne): "))
            {
                objekti.Add(PostaviObjekt());
            }
            return objekti;
        }

        private Objekt PostaviObjekt()
        {
            PrikaziObjekte();
            int Index = Pomocno.UcitajBrojRaspon("Odaberi redni broj objekta: ", "Nije dobar odabir", 1, Objekti.Count());
            return Objekti[Index - 1];
        }

        // Izbornik vrsta

        private void IzbornikVrsteObjekata()
        {
            Console.WriteLine();
            Console.WriteLine("VRSTE OBJEKATA");
            Console.WriteLine();
            Console.WriteLine("1. Prikaži vrste objekata");
            Console.WriteLine("2. Dodaj vrstu objekta");
            Console.WriteLine("3. Uredi vrstu objekta");
            Console.WriteLine("4. Briši vrstu objekta");
            Console.WriteLine("5. Povratak u glavni izbornik");
            Console.WriteLine();
            OdabirStavkeIzbornikaVrsteObjekata();
        }

        private void OdabirStavkeIzbornikaVrsteObjekata()
        {
            switch (Pomocno.UcitajInt("Odaberite stavku izbornika: "))
            {
                case 1:
                    Console.WriteLine();
                    Console.WriteLine("Prikaži vrste objekata: ");
                    PrikaziVrsteObjekata();
                    IzbornikVrsteObjekata();
                    break;
                case 2:
                    Console.WriteLine();
                    Console.WriteLine("Dodaj vrstu objekta: ");
                    DodajVrstuObjekta();
                    break;
                case 3:
                    Console.WriteLine();
                    Console.WriteLine("Uredi vrstu objekta: ");
                    UrediVrstuObjekta();
                    break;
                case 4:
                    Console.WriteLine();
                    Console.WriteLine("Obriši vrstu objekta");
                    BrisiVrstuObjekta();
                    break;
                case 5:
                    Console.WriteLine();
                    Console.WriteLine("Povratak u glavni izbornik");
                    Izbornik();
                    break;
                default:
                    Console.WriteLine("Krivi odabir");
                    OdabirStavkeIzbornikaVrsteObjekata();
                    break;
            }
        }

        private void PrikaziVrsteObjekata()
        {
            Console.WriteLine();
            Console.WriteLine("Vrste objekata");
            Console.WriteLine();
            var i = 0;
            Vrste.ForEach(v =>
            {
                Console.WriteLine(++i + "." + v);
            });

            if (Vrste.Count == 0)
            {
                Console.WriteLine("Nema vrsti objekata");
            }
            Console.WriteLine("==========");
        }

        private void DodajVrstuObjekta()
        {
            Vrste.Add(new Vrsta()
            {
                Sifra = Pomocno.UcitajInt("Unesi šifru vrste objekta: "),
                Naziv = Pomocno.UcitajString("Unesi naziv vrste objekta: ")
            });
            Console.WriteLine();
            IzbornikVrsteObjekata();
        }

        private void UrediVrstuObjekta()
        {
            PrikaziVrsteObjekata();
            var v = Vrste[Pomocno.UcitajInt("Odaberi vrstu objekta za izmjenu: ") - 1];
            v.Sifra = Pomocno.UcitajInt(v.Sifra + ", Unesi novu šifru: ");
            v.Naziv = Pomocno.UcitajString(v.Naziv + ", Unesi novi naziv");
            Console.WriteLine();
            IzbornikVrsteObjekata();
        }

        private void BrisiVrstuObjekta()
        {
            PrikaziVrsteObjekata();
            Vrste.RemoveAt(Pomocno.UcitajInt("Odaberi vrstu objekta za brisanje") - 1);
            Console.WriteLine();
            IzbornikVrsteObjekata();
        }

        private List<Vrsta> PostaviVrsteObjekata()
        {
            List<Vrsta> vrste = new List<Vrsta>();
            while (Pomocno.UcitajBool("Želite li dodati vrste objekata? (da ili bilo što drugo za ne): "))
            {
                vrste.Add(PostaviVrstu());
            }
            return vrste;
        }

        private Vrsta PostaviVrstu()
        {

            PrikaziVrsteObjekata();
            int Index = Pomocno.UcitajBrojRaspon("Odaberi redni broj vrste objekta: ", "Nije dobar odabir", 1, Vrste.Count());
            return Vrste[Index - 1];

        }

    }
}
