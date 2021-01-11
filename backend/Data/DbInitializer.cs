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
                new Queue { Name = "Pharmacy" }
            };

            context.Queues.AddRange(queues);
            context.SaveChanges();
        }
    }
}