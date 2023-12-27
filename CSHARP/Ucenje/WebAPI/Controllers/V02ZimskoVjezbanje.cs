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
            return 100*(100+1)/2;
        }        
        
    }
}
