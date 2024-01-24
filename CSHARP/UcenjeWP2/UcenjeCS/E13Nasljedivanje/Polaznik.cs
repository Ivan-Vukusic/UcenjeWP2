using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.E13Nasljedivanje
{
    internal class Polaznik : Osoba // Klasa Polaznik nasljeđuje sva javna i zaštićena svojstva klase Osoba
    {
        private int Vidim;
        public string BrojUgovora { get; set; }

        public Polaznik():base() // ovo i ne treba eksplicitno navesti 
        {
            Console.WriteLine("Konstruktor Polaznika");
        }

        public Polaznik(int sifra, string ime, string prezime,
            string oib, string email, string BrojUgovora):base(sifra,ime,prezime,oib,email)
        {
            BrojUgovora = BrojUgovora;
            //base.Sifra = sifra; // Ovome tu nije mjesto, to mora odraditi klasa u kojoj se nalazi svojstvo sifra
        }

        public override string ToString()
        {
            return new StringBuilder(base.ToString()).Append(',').Append(BrojUgovora).ToString();
        }



        private void ProvjeraVidljivosti()
        {
            Vidim = 2; // ovo je u mojoj klasi
            base.Sifra = 2;
            base.Vidim = 7; // ovo je u nadklasi
            this.Vidim = 8; // ovo je u mojoj klasi
            //NeVidim // se ne vidi
        }
    }
}
