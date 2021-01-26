using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace VirtualQueue.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet("open")]
        public IActionResult GetOpen()
        {
            return Ok("Here it is");
        }

        [Authorize]
        [HttpGet("locked")]
        public IActionResult GetLocked()
        {
            return Ok("It's open");
        }
    }
}