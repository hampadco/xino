using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using xino.Models;

namespace xino.Controllers;

public class HomeController : Controller
{
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
    public IActionResult Portfolio(){
        ViewBag.MetaDescription = "نمونه کارهای زینو سازه شامل انواع سازه های فلزی و پیش ساخته در نمایشگاه های مختلف می باشد.";
        ViewBag.Title = "زینو سازه | نمونه کارها";
        return View();
    }

}
