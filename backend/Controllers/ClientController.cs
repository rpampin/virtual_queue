using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using VirtualQueue.Data;
using VirtualQueue.Models;

namespace VirtualQueue.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly QueueDbContext _context;
        private readonly Random _random;

        public ClientController(QueueDbContext context)
        {
            _context = context;
            _random = new Random();
        }

        string RandomString(int length = 4)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[_random.Next(s.Length)]).ToArray());
        }

        [HttpPost("get-ticket")]
        public IActionResult GetTicket([FromBody] Guid QueueId)
        {
            int number = _context.Clients
            .Where(c => c.CreationDate.Date == DateTime.Now.Date)
            .Where(c => c.Queue.Id == QueueId)
            .Select(c => c.Number)
            .DefaultIfEmpty()
            .Max();

            EntityEntry<Client> entry = _context.Clients.Add(new Client
            {
                Number = number + 1,
                CreationDate = DateTime.Now,
                SecretCode = RandomString(),
                Queue = _context.Queues.First(d => d.Id == QueueId),
            });

            _context.SaveChanges();

            return Ok(new
            {
                entry.Entity.Id,
                entry.Entity.Number,
                entry.Entity.SecretCode,
                entry.Entity.Queue.Name
            });
        }

        [HttpPut("cancel")]
        public IActionResult Cancel([FromBody] Guid ClientId)
        {
            var client = _context.Clients
            .Where(c => c.Id == ClientId)
            .First();

            client.Cancelled = true;

            _context.SaveChanges();

            return Ok();
        }
    }
}