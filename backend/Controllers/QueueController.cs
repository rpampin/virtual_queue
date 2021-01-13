using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using VirtualQueue.Data;

namespace VirtualQueue.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QueueController : ControllerBase
    {
        private readonly QueueDbContext _context;

        public QueueController(QueueDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Queues.ToList());
        }

        [HttpPut("call-next")]
        public IActionResult CallNext([FromBody] Guid QueueId)
        {
            var next = _context.Clients
            .Where(c => c.Queue.Id == QueueId)
            .Where(c => c.CreationDate.Date == DateTime.Now.Date)
            .Where(c => c.CallingDate == null && !c.Cancelled)
            .OrderBy(c => c.Number)
            .FirstOrDefault();

            if (next == null) return NotFound();

            next.CallingDate = DateTime.Now;
            _context.SaveChanges();

            return Ok(next);
        }
    }
}