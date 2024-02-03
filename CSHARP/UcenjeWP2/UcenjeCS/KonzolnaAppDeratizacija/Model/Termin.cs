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
        public List <Djelatnik> Djelatnici { get; set; }
        public List <Objekt> Objekti { get; set; }
        public List <Otrov> Otrovi { get; set; }
        public string Napomena { get; set; }
        }
}
