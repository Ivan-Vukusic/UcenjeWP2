using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("V02")]
    public class V02ZimskoVjezbanje : ControllerBase
    {
        [HttpGet]
        [Route("Vjezba1")]
        public int Vj1()
        {
            return 100 * (100 + 1) / 2;
        }



        [HttpGet]
        [Route("Vjezba2")]

        public int[] Vj2() 
        {            
            int[] niz = new int[28];
            int n = 0;
            
            for(int i = 1; i < 57; i++) 
            {
                if(i % 2 == 0) 
                {
                    niz[n++] = i;
                }                
            }   
            return niz;
        }


    }
}
