using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.KonzolnaAppDeratizacija.Model
{
    internal class Otrov : Entitet
    {
        public string Naziv { get; set; }
        public string AktivnaTvar { get; set; }
        public decimal Kolicina { get; set; }
        public string CasBroj { get; set; }

        public override string ToString()
        {
            return Naziv;
        }
    }
}
