using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.KonzolnaAppDeratizacija.Model
{
    internal class Termin : Entitet
    {
        public DateTime Datum { get; set; }
        public Djelatnik Djelatnik { get; set; }
        public Objekt Objekt { get; set; }
        public Otrov Otrov { get; set; }
        public string Napomena { get; set; }

        public override string ToString()
        {
            return Napomena;
        }
    }
}
