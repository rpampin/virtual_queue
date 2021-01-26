using VirtualQueue.Models;
using Microsoft.EntityFrameworkCore;

namespace VirtualQueue.Data
{
    public class QueueDbContext : DbContext
    {
        public QueueDbContext(DbContextOptions<QueueDbContext> options) : base(options)
        {
        }

        public DbSet<Queue> Queues { get; set; }
        public DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Queue>().ToTable("Queue");
            modelBuilder.Entity<Client>().ToTable("Client");
        }
    }
}