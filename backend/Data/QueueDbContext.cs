using VirtualQueue.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.Extensions.Options;
using IdentityServer4.EntityFramework.Options;

namespace VirtualQueue.Data
{
    public class QueueDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public QueueDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<Queue> Queues { get; set; }
        public DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Queue>().ToTable("Queue");
            modelBuilder.Entity<Client>().ToTable("Client");
        }
    }
}