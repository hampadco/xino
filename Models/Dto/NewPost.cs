public class NewPost
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public List<IFormFile> Images { get; set; }
    public string Location { get; set; }
    public string Year { get; set; }
    public string Scale { get; set; }
    public int WorkCatId { get; set; }
}