using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices.JavaScript;
using System.Text;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("V02")]
    public class V02ZimskoVjezbanje : ControllerBase
    {
        //Ruta ne prima niti jedan parametar i vraća zbroj prvih 100 brojeva
        [HttpGet]
        [Route("Vježba1")]
        public int Vj1()
        {
            return 100 * (100 + 1) / 2;
        }


        //Ruta ne prima niti jedan parametar i vraća niz s svim parnim brojevima od 1 do 57
        [HttpGet]
        [Route("Vježba2")]

        public int[] Vj2()
        {
            int[] niz = new int[28];
            int n = 0;

            for (int i = 1; i < 57; i++)
            {
                if (i % 2 == 0)
                {
                    niz[n++] = i;
                }
            }
            return niz;
        }


        //Ruta ne prima niti jedan parametar i vraća zbroj svih parnih brojeva od 2 do 18
        [HttpGet]
        [Route("Vježba3")]

        public int Vj3()
        {
            int suma = 0;
            for (int i = 2; i <= 18; i++)
            {
                if (i % 2 == 0)
                {
                    suma += i;
                }
            }

            return suma;
        }


        //Ruta prima jedan parametar koji je cijeli broj i vraća zbroj svih brojeva od 1 do primljenog broja
        [HttpGet]
        [Route("Vježba4")]

        public int Vj4(int broj)
        {
            int suma = 0;

            for (int i = 0; i <= broj; i++)
            {
                suma += i;
            }
            return suma;
        }


        //Ruta prima dva parametra koji su cijeli brojevi i vraća niz sa svim parnim brojevima između primljenih brojeva
        [HttpGet]
        [Route("Vježba5")]
        public int[] Vj5(int x, int y)
        {

            int a = 0;
            int b = 0;

            if (x < y)
            {
                a = x;
                b = y;
            }
            else
            {
                a = y;
                b = x;
            }

            int[] niz = new int[b / 2];
            int n = 0;

            for (int i = a; i <= b; i++)
            {
                if (i % 2 == 0)
                {
                    niz[n++] = i;
                }
            }
            return niz;
        }


        //Ruta prima dva parametra koji su cijeli brojevi i vraća niz s svim neparnim brojevima između primljenih brojeva
        [HttpGet]
        [Route("Vježba6")]
        public int[] Vj6(int x, int y)
        {
            int a = 0;
            int b = 0;

            if (x < y)
            {
                a = x;
                b = y;
            }
            else
            {
                a = y;
                b = x;
            }

            int[] niz = new int[b / 2];
            int n = 0;

            for (int i = a; i <= b; i++)
            {
                if (i % 2 != 0)
                {
                    niz[n++] = i;
                }
            }
            return niz;
        }


        //Ruta prima dva parametra koji su cijeli brojevi i vraća zbroj svih brojeva između primljenih brojeva
        [HttpGet]
        [Route("Vježba7")]
        public int Vj7(int x, int y)
        {
            int suma = 0;
            int a = 0;
            int b = 0;

            if (x < y)
            {
                a = x;
                b = y;
            }
            else
            {
                a = y;
                b = x;
            }

            for (int i = a; i <= b; i++)
            {
                suma += i;
            }

            return suma;
        }


        //Ruta prima dva parametra koji su cijeli brojevi i vraća zbroj svih brojeva između primljenih brojeva koji su cjelobrojno djeljivi s 3
        [HttpGet]
        [Route("Vježba8")]
        public int Vj8(int x, int y)
        {
            int suma = 0;
            int a = 0;
            int b = 0;

            if (x < y)
            {
                a = x;
                b = y;
            }
            else
            {
                a = y;
                b = x;
            }

            for (int i = a; i <= b; i++)
            {
                if (i % 3 == 0)
                {
                    suma += i;
                }
            }
            return suma;
        }


        //Ruta prima dva parametra koji su cijeli brojevi i vraća zbroj svih brojeva između primljenih brojeva koji su cjelobrojno djeljivi s 3 i 5
        [HttpGet]
        [Route("Vježba9")]
        public int Vj9(int x, int y) 
        {
            int a = 0;
            int b = 0;

            if (x < y)
            {
                a = x;
                b = y;
            }
            else
            {
                a = y;
                b = x;
            }

            int zb1 = 0;
            int zb2 = 0;
            int suma = 0;

            for(int i = a; i <= b; i++) 
            {
                if (i % 3 == 0) 
                {
                    zb1 += i;
                }

                if(i % 5 == 0) 
                {
                    zb2 += i;
                }
            }
            suma = zb1 + zb2;

            return suma;
        }


        //Ruta prima dva parametra koji su cijeli brojevi i vraća dvodimenzionalni niz (matricu) koja sadrži tablicu množenja za dva primljena broja
        [HttpGet]
        [Route("Vježba10")]
        public string Vj10(int x, int y)
        {
            int[,] Tab = new int[x,y];

            StringBuilder Rez = new StringBuilder();           

            for (int i = 1; i <= x; i++)
            {
                for(int j = 1; j <= y; j++)
                {
                    Tab[i - 1, j - 1] = i * j;
                    Rez.Append(Tab[i - 1, j - 1] + "\t");
                }
                Rez.AppendLine();
            }
            
            return Rez.ToString();
        }
            
            
        

        //Ruta prima jedan parametar koji je cijeli broj i vraća niz cijelih brojeva koji su složeni od primljenog broja do broja 1
        [HttpGet]
        [Route("Vježba11")]
        public int[] Vj11(int x) 
        {            
            int[] niz = new int[x];
            int n = 0;
            
            for (int i = x; i > 0; i--) 
            {
                niz[n++] = i;
            }
            return niz;
        }


        //Ruta prima cijeli broj i vraća logičku istinu ako je primljeni broj prosti (prim - prime) broj, odnosno logičku laž ako nije
        [HttpGet]
        [Route("Vježba12")]
        public bool Vj12(int x) 
        {
            for(int i = 2; i < x; i++) 
            {                
                if(x % i == 0) 
                {
                    return false;                    
                }                
            }
            return true;
        }



        [HttpGet]
        [Route("Vježba13")] // Ciklična matrica - kretanje u smjeru kazaljke - kretanje dolje desno

        public string Vj13(int Red, int Stupac)
        {
            int[,] Matrica = new int[Red, Stupac]; // definiranje matrice

            StringBuilder SB = new StringBuilder();

            int Brojac = 1;

            int GornjiRed = 0; // početak stupca
            int DonjiRed = Red - 1; // kraj stupca
            int LijeviStupac = 0; // početak reda
            int DesniStupac = Stupac - 1; // kraj reda

            for (; Brojac <= Red * Stupac;)
            {
                for (int i = DesniStupac; i >= LijeviStupac; i--) // lijevo
                {
                    Matrica[DonjiRed, i] = Brojac++;
                }
                DonjiRed--;

                for (int i = DonjiRed; i >= GornjiRed; i--) // gore
                {
                    Matrica[i, LijeviStupac] = Brojac++;
                }
                LijeviStupac++;

                if (Brojac <= Red * Stupac)
                {
                    for (int i = LijeviStupac; i <= DesniStupac; i++) // desno
                    {
                        Matrica[GornjiRed, i] = Brojac++;
                    }
                }
                GornjiRed++;

                if (Brojac <= Red * Stupac)
                {
                    for (int i = GornjiRed; i <= DonjiRed; i++) // dolje
                    {
                        Matrica[i, DesniStupac] = Brojac++;
                    }
                }
                DesniStupac--;
            }

            for(int i = 0; i < Red; i++) // ispis matrice
            {
                for(int j = 0; j < Stupac; j++)
                {
                    SB.Append(Matrica[i, j] + "\t");
                }
                SB.AppendLine();
            }

            return SB.ToString();

        }
    }
}
