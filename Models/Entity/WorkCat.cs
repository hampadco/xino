using System.ComponentModel.DataAnnotations;

public class WorkCat
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime CreateDate { get; set; }
    public List<WorkPost> WorkPosts { get; set; }
}