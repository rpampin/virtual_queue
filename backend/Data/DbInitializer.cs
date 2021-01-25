using System;
using System.Linq;
using VirtualQueue.Models;

namespace VirtualQueue.Data
{
    public static class DbInitializer
    {
        static Random _random = new Random();

        static string RandomString(int length = 10)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[_random.Next(s.Length)]).ToArray());
        }

        public static void Initialize(QueueDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Queues.Any())
            {
                return;   // DB has been seeded
            }

            var queues = new Queue[]
            {
                new Queue { Name = "Pharmacy", Code = RandomString() },
                new Queue { Name = "Market", Code = RandomString() }
            };

            context.Queues.AddRange(queues);
            context.SaveChanges();
        }
    }
}