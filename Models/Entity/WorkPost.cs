using System.ComponentModel.DataAnnotations;

public class WorkPost
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public List<string> Images { get; set; }
    public string Location { get; set; }
    public string Year { get; set; }
    public string Scale { get; set; }
    public DateTime CreateDate { get; set; }
    public int WorkCatId { get; set; }
    public WorkCat WorkCat { get; set; }
}