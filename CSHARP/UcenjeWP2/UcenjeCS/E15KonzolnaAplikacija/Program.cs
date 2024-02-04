using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcenjeCS.E15KonzolnaAplikacija.Model;

namespace UcenjeCS.E15KonzolnaAplikacija
{
    internal class Program
    {
        private List<Smjer> Smjerovi;
        public Program()
        {
            Smjerovi = new List<Smjer>();
            PozdravnaPoruka();
            Izbornik();

        }

        private void PozdravnaPoruka()
        {
            Console.WriteLine("**********************************");
            Console.WriteLine("* EDUNOVA KONZOLNA APLIKACIJA v1 *");
            Console.WriteLine("**********************************");
        }

        private void Izbornik()
        {
            Console.WriteLine("Izbornik");
            Console.WriteLine("1. Rad s smjerovima");
            Console.WriteLine("2. Rad s predavačima");
            Console.WriteLine("3. Rad s polaznicima");
            Console.WriteLine("4. Rad s grupama");
            Console.WriteLine("5. Izlaz iz programa");
            OdabirStavkePocetnogIzbornika();
        }

        private void OdabirStavkePocetnogIzbornika()
        {            
            switch (Pomocno.UcitajInt("Unesi izbor: "))
            {
                case 1:
                    Console.WriteLine("Rad sa smjerovima");
                    IzbornikRadSaSmjerovima();
                    break;
                case 2:
                    Console.WriteLine("Rad sa predavačima");
                    break;
                case 3:
                    Console.WriteLine("Rad s polaznicima");
                    break;
                case 4:
                    Console.WriteLine("Rad s grupama");
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

        private void IzbornikRadSaSmjerovima()
        {
            Console.WriteLine("1. Prikaži sve smjerove");
            Console.WriteLine("2. Dodaj smjer");
            Console.WriteLine("3. Uredi smjer");
            Console.WriteLine("4. Obriši smjer");
            Console.WriteLine("5. Povratak u glavni izbornik");
            OdabirStavkeIzbornikaSmjerova();
        }
        
        private void OdabirStavkeIzbornikaSmjerova()
        {
            switch (Pomocno.UcitajInt("Odaberi stavku izbornika: "))
            {
                case 1:
                    Console.WriteLine("Prikaži sve smjerove");
                    PrikaziSmjerove();
                    IzbornikRadSaSmjerovima();
                    break;
                case 2:
                    Console.WriteLine("Dodaj smjer");
                    DodajNoviSmjer();
                    break;
                case 3:
                    Console.WriteLine("Uredi smjer");
                    UrediSmjer();
                    break;
                case 4:
                    Console.WriteLine("Izbriši smjer");
                    IzbrisiSmjer();
                    break;
                case 5:
                    Console.WriteLine("Povratak u glavni izbornik");
                    Izbornik();
                    break;
                default:
                    Console.WriteLine("Krivi odabir");
                    IzbornikRadSaSmjerovima();
                    break;
            }
        }

        private void PrikaziSmjerove()
        {
            var i = 0;
            Smjerovi.ForEach(s => {
                Console.WriteLine(++i + ". " + s);
            });
            Console.WriteLine("******************");
        }

        private void DodajNoviSmjer()
        {
            Smjerovi.Add(new Smjer()
            {
                Sifra = Pomocno.UcitajInt("Unesi širu smjera: "),
                Naziv = Pomocno.UcitajString("Unesi naziv smjera: "),
                BrojSati = Pomocno.UcitajInt("Unesi broj sati: "),
                Cijena = Pomocno.ucitajDecimalniBroj("Unesi cijenu smjera (. za decimalni dio): ", "Unos mora biti pozitivan broj"),
                Upisnina = Pomocno.ucitajDecimalniBroj("Unesi cijenu upisnine (. za decimalni dio: )", "Unos mora biti pozitivan broj"),
                Verificiran = Pomocno.ucitajBool("Je li smjer vreificiran (da ili nešto drugo za ne): ")
            });
            IzbornikRadSaSmjerovima();
        }

        private void UrediSmjer()
        {
            PrikaziSmjerove();
            var s = Smjerovi[Pomocno.UcitajInt("Odaberi smjer za promjenu: ") - 1];
            s.Sifra = Pomocno.UcitajInt(s.Sifra + ", Unesi novu šifru: ");
            s.Naziv = Pomocno.UcitajString(s.Naziv + ", Unesi novi naziv: ");
            s.BrojSati = Pomocno.UcitajInt(s.BrojSati + ", Unesi novi broj sati: ");
            s.Cijena = Pomocno.ucitajDecimalniBroj(s.Cijena + ", Unesi novu cijenu:", "Unos mora biti pozitivan broj");
            s.Upisnina = Pomocno.ucitajDecimalniBroj(s.Upisnina + ", Unesi novu cijenu: ", "Unos mora biti pozitivan broj");
            s.Verificiran = Pomocno.ucitajBool(s.Verificiran + ", Unesi novi status verifikacije: ");
            IzbornikRadSaSmjerovima();
        }        

        private void IzbrisiSmjer()
        {
            PrikaziSmjerove();
            Smjerovi.RemoveAt(Pomocno.UcitajInt("Odaberi smjer za brisanje: ") - 1);
            IzbornikRadSaSmjerovima();
        }
    }
}
