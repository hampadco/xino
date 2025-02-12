using Microsoft.EntityFrameworkCore;

public class Context : DbContext
{
    public Context(DbContextOptions<Context> options) : base(options)
    {
    }

    public DbSet<WorkPost> WorkPosts { get; set; }
    public DbSet<WorkCat> WorkCats { get; set; }
}
