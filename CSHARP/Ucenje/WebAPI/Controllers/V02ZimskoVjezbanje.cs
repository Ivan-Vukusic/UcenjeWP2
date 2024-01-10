using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices.JavaScript;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("V02")]
    public class V02ZimskoVjezbanje : ControllerBase
    {
        //Ruta ne prima niti jedan parametar i vraća zbroj prvih 100 brojeva
        [HttpGet]
        [Route("Vjezba1")]
        public int Vj1()
        {
            return 100 * (100 + 1) / 2;
        }


        //Ruta ne prima niti jedan parametar i vraća niz s svim parnim brojevima od 1 do 57
        [HttpGet]
        [Route("Vjezba2")]

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
        [Route("Vjezba3")]

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
        [Route("Vjezba4")]

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
        [Route("Vjezba5")]
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
        [Route("Vjezba6")]
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
        [Route("Vjezba7")]
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
        [Route("Vjezba8")]
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
        [Route("Vjezba9")]
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
        [Route("Vjezba10")]
        public int[] Vj10(int x, int y)
        {
            int[] Tab1 = new int[x];
            int[] Tab2 = new int[y];

            for (int i = 1; i <= 10; i++)
            {
                Tab1[i] = (i + 1) * x;
            }

            for (int i = 1; i <= 10; i++)
            {
                Tab2[i] = (i + 1) * y;
            }

            int[,] Rezultat = new int[x, y];

            // riješiti spajanje nizova

        return Tab1;
        }
            
            
        

        //Ruta prima jedan parametar koji je cijeli broj i vraća niz cijelih brojeva koji su složeni od primljenog broja do broja 1
        [HttpGet]
        [Route("Vjezba11")]
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
        [Route("Vjezba12")]
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
    }
}
