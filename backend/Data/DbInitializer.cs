using System.Linq;
using VirtualQueue.Models;

namespace VirtualQueue.Data
{
    public static class DbInitializer
    {
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
                new Queue { Name = "Pharmacy" },
                new Queue { Name = "Market" }
            };

            context.Queues.AddRange(queues);
            context.SaveChanges();
        }
    }
}