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

}
