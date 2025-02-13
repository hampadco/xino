// ------------ swiper sliders -----------
$(document).ready(function () {
  // about marq slider
  var swiper = new Swiper(".ui-about-st1 .marq-slider", {
    slidesPerView: "auto",
    spaceBetween: 50,
    centeredSlides: true,
    pagination: false,
    navigation: false,
    mousewheel: false,
    keyboard: true,
    speed: 30000,
    allowTouchMove: false,
    autoplay: {
      delay: 1,
    },
    loop: true,
  });

  // testimonials slider
  var galleryThumbs = new Swiper(".ui-testimonials-st1 .gallery-thumbs", {
    spaceBetween: 10,
    slidesPerView: 4,
    loop: false,
    freeMode: true,
    loopedSlides: 5,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    speed: 1500,
    direction: "vertical",
    slidesPerView: 3,
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      0: {
        slidesPerView: 3,
        direction: "horizontal",
      },
      480: {
        slidesPerView: 3,
        direction: "horizontal",
      },
      787: {
        slidesPerView: 3,
        direction: "horizontal",
      },
      991: {
        slidesPerView: 3,
        direction: "vertical",
      },
      1200: {
        slidesPerView: 3,
        direction: "vertical",
      }
    }
  });

  var galleryTop = new Swiper(".ui-testimonials-st1 .testimonials-slider", {
    spaceBetween: 30,
    loop: false,
    loopedSlides: 5,
    navigation: {
      nextEl: ".ui-testimonials-st1 .swiper-button-next",
      prevEl: ".ui-testimonials-st1 .swiper-button-prev",
    },
    thumbs: {
      swiper: galleryThumbs,
    },
    speed: 1500,
    autoplay: {
      delay: 2000,
    },
  });

  // portfolio slider animation
  // if (window.innerWidth > 991) {  // Only run on desktop
  //   gsap.utils
  //     .toArray(".ui-portfolio-st1 .portfolio-slider .item")
  //     .forEach((item) => {
  //       const tl = gsap.timeline({
  //         scrollTrigger: {
  //           trigger: item,
  //           start: "top bottom",
  //           end: "bottom+=150% center",
  //           scrub: true,
  //         },
  //       });

  //       tl.from(item, {
  //         translateY: "0",
  //         rotateX: "-50deg",
  //         scale: 0.9,
  //         ease: "linear",
  //       })
  //       .to(item, {
  //         translateY: "0",
  //         rotateX: "50deg",
  //         scale: 0.9,
  //         ease: "linear",
  //       });
  //     });
  // }
  if (window.innerWidth > 991) {  // Only run on desktop
    gsap.utils
      .toArray(".ui-portfolio-st1 .portfolio-slider .item")
      .forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom center", // نقطه پایان
            scrub: true,
            onLeave: () => {
              gsap.to(item, { opacity: 0 }); // محو کردن عکس هنگام خروج
            },
            onEnterBack: () => {
              gsap.to(item, { opacity: 1 }); // نمایش دوباره عکس هنگام برگشت
            }
          },
        });

        tl.from(item, {
          translateY: "30%",
          rotateX: "-10deg", // کاهش مقدار چرخش به -10 درجه
          scale: 0.9,
          ease: "power1.out",
        })
          .to(item, {
            translateY: "0%",
            rotateX: "10deg", // کاهش مقدار چرخش به 10 درجه
            scale: 1,
            ease: "power1.out",
          });
      });
  }
});

