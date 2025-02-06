$(document).ready(function() {
    // فیلتر نمونه کارها
    $('.filter-btn').on('click', function() {
        // حذف کلاس active از همه دکمه‌ها
        $('.filter-btn').removeClass('active');
        // اضافه کردن کلاس active به دکمه کلیک شده
        $(this).addClass('active');
        
        // گرفتن مقدار فیلتر
        const filterValue = $(this).attr('data-filter');
        
        if(filterValue === 'all') {
            // نمایش همه آیتم‌ها
            $('.portfolio-item').fadeIn(300);
        } else {
            // مخفی کردن همه آیتم‌ها
            $('.portfolio-item').fadeOut(0);
            // نمایش آیتم‌های مربوط به دسته‌بندی انتخاب شده
            $('.portfolio-item[data-category="'+ filterValue +'"]').fadeIn(300);
        }
    });

    // انیمیشن ظاهر شدن آیتم‌ها در لود صفحه
    $('.portfolio-item').each(function(i) {
        setTimeout(() => {
            $(this).addClass('show');
        }, 200 * i);
    });
}); 