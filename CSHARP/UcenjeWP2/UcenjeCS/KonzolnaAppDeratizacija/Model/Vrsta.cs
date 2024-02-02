using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.KonzolnaAppDeratizacija.Model
{
    internal class Vrsta : Entitet
    {
        public string Naziv { get; set; }

        public override string ToString()
        {
            return Naziv;
        }
    }
}
