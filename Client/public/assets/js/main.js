/*================================================
[  Table of contents  ]
================================================

1. Variables
2. Mobile Menu
//4. One Page Navigation
10. Nice Select
12. Product Details Page
14. LightCase jQuery Active

16. Product Slider One
18. Blog Slider One
21. Testimonial Slider - 5



======================================
[ End table content ]
======================================*/

;(function ($) {
  "use strict"

  jQuery(document).ready(function () {
    /* --------------------------------------------------------
              10. Nice Select
          --------------------------------------------------------- */
    //   $('select').niceSelect();

    /* --------------------------------------------------------
              14. LightCase jQuery Active
          --------------------------------------------------------- */
    $("a[data-rel^=lightcase]").lightcase({
      transition:
        "elastic" /* none, fade, fadeInline, elastic, scrollTop, scrollRight, scrollBottom, scrollLeft, scrollHorizontal and scrollVertical */,
      swipe: true,
      maxWidth: 1170,
      maxHeight: 600,
    })
  })

  $(window).on("load", function () {
    /*-----------------
              preloader
          ------------------*/
    if ($("#preloader").length) {
      var preLoder = $("#preloader")
      preLoder.fadeOut(1000)
    }
  })
})(jQuery)
