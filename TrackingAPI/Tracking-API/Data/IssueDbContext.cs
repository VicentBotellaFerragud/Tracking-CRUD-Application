using Microsoft.EntityFrameworkCore;
using Tracking_API.Models;

namespace Tracking_API.Data
{
    //"IssueDbContext" communicates/interacts with the data base. "DbContext" comes from the EntityFrameworkCore package.
    public class IssueDbContext : DbContext
    {
        //This allows to set some options needed by the "DbContext" so that it knows how to talk to the data base.
        public IssueDbContext(DbContextOptions<IssueDbContext> options)
            : base(options)
        {
        }

        //This is a representatiton of the table in the data base. It allows us to manipulate data from the issue table.
        public DbSet<Issue> Issues { get; set; }
    }
}
