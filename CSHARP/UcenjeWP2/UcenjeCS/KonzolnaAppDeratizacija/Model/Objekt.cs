﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.KonzolnaAppDeratizacija.Model
{
    internal class Objekt : Entitet
    {
        public string Mjesto { get; set; }
        public string Adresa { get; set; }
        public Vrsta Vrsta { get; set; }

        public override string ToString()
        {
            return Adresa;
        }
    }
}
