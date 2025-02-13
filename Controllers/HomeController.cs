using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class HomeController : Controller
{
    private readonly Context db;
    public HomeController(Context _db)
    {
        db = _db;
    }
    public IActionResult Index()
    {
        ViewBag.MetaDescription = "زینو سازه ارائه دهنده خدمات مهندسی و ساختمانی و تولید کننده انواع سازه های فلزی و پیش ساخته در ایران می باشد.";
        ViewBag.Title = "زینو سازه | خانه";
        return View();
    }
    public IActionResult About()
    {
        ViewBag.MetaDescription = "زینو سازه ارائه دهنده خدمات مهندسی و ساختمانی و تولید کننده انواع سازه های فلزی و پیش ساخته در ایران می باشد.";
        ViewBag.Title = "زینو سازه | درباره ما";
        return View();
    }
    public IActionResult Services()
    {
        ViewBag.MetaDescription = "خدمات مهندسی و ساختمانی زینو سازه شامل طراحی و ساخت انواع سازه های فلزی و پیش ساخته همراه پشتیبانی و خدمات پس از فروش میباشد.";
        ViewBag.Title = "زینو سازه | خدمات";
        return View();
    }
    public IActionResult Portfolio()
    {
        ViewBag.MetaDescription = "نمونه کارهای زینو سازه شامل انواع سازه های فلزی و پیش ساخته در نمایشگاه های مختلف می باشد.";
        ViewBag.Title = "زینو سازه | نمونه کارها";
        ViewBag.Works = db.WorkPosts.Include(x => x.WorkCat).ToList();
        ViewBag.Categories = db.WorkCats.ToList();
        return View();
    }
    public IActionResult Contact()
    {
        ViewBag.MetaDescription = "زینو سازه آمادگی دارد که نظرات و پیشنهادات شما را بپذیرد و در اسرع وقت به آنها پاسخ دهد.";
        ViewBag.Title = "زینو سازه | تماس با ما";
        return View();
    }
    public IActionResult Project(int Id = 0)
    {

        if (Id == 0) return RedirectToAction("index");
        WorkPost? result = db.WorkPosts.Include(x => x.WorkCat).FirstOrDefault(x => x.Id == Id);
        if (result == null) return RedirectToAction("index");
        ViewBag.MetaDescription = "جزئیات پروژه ی ما رو میتوانید در این قسمت مشاهده کنید.";
        ViewBag.Title = $"زینو سازه | پروژه {result.Title}";

        int totalCount = db.WorkPosts.Count();
        Random random = new Random();
        int index;
        if (totalCount < 3) index = 0;
        else index = random.Next(totalCount - 3);
        ViewBag.otherProjects = db.WorkPosts.Skip(index).Take(3).Include(x => x.WorkCat).ToList();

        return View(result);
    }

}
