using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.KonzolnaAppDeratizacija.Model
{
    internal class Djelatnik : Entitet
    {
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string BrojMobitela { get; set; }
        public string Oib { get; set; }
        public string Struka { get; set; }

        public override string ToString()
        {
            return Ime + " " + Prezime;
        }
    }
}
