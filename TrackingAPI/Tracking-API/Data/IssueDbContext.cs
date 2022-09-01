using Microsoft.EntityFrameworkCore;
using Tracking_API.Models;

namespace Tracking_API.Data
{
    public class IssueDbContext : DbContext
    {
        public IssueDbContext(DbContextOptions<IssueDbContext> options) : base(options) { }

        public DbSet<Issue> Issues { get; set; }
    }
}
