using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("V01")]
    public class V01ZimskoVjezbanje : ControllerBase
    {
        //prima tri parametra: dva cijela broja i string. String može biti + - * i /. Ruta vraća rezultat
        [HttpGet]
        [Route("Vjezba1")]
        public float V1(int X, int Y, string Radnja) 
        {
            switch (Radnja) 
            {
                case "+":
                    return X + Y;
                    break;
                
                case "-":
                    return X - Y;
                    break;
                
                case "*":
                    return X * Y;
                    break;
                
                case "/":
                    return (float)X / Y;
                    break;
            }
            return 0;
        }


        //prima niz decimalnih brojeva. Vraća zbroj cijelog dijela prvog elementa niza i decimalnog dijela zadnjeg elementa niza
        
    }
}
