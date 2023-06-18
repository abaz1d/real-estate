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

(function ($) {
  "use strict";

  jQuery(document).ready(function () {
    /* --------------------------------------------------------
              1. Variables
          --------------------------------------------------------- */
    var $window = $(window),
      $body = $("body");

    /* --------------------------------------------------------
              2. Mobile Menu
          --------------------------------------------------------- */
    /* ---------------------------------
              Utilize Function 
          ----------------------------------- */
    (function () {
      var $ltn__utilizeToggle = $(".ltn__utilize-toggle"),
        $ltn__utilize = $(".ltn__utilize"),
        $ltn__utilizeOverlay = $(".ltn__utilize-overlay"),
        $mobileMenuToggle = $(".mobile-menu-toggle");
      $ltn__utilizeToggle.on("click", function (e) {
        e.preventDefault();
        var $this = $(this),
          $target = $this.attr("href");
        $body.addClass("ltn__utilize-open");
        $($target).addClass("ltn__utilize-open");
        $ltn__utilizeOverlay.fadeIn();
        if ($this.parent().hasClass("mobile-menu-toggle")) {
          $this.addClass("close");
        }
      });
      $(".ltn__utilize-close, .ltn__utilize-overlay").on("click", function (e) {
        e.preventDefault();
        $body.removeClass("ltn__utilize-open");
        $ltn__utilize.removeClass("ltn__utilize-open");
        $ltn__utilizeOverlay.fadeOut();
        $mobileMenuToggle.find("a").removeClass("close");
      });
    })();

    /* ------------------------------------
              Utilize Menu
          ----------------------------------- */
    function mobileltn__utilizeMenu() {
      var $ltn__utilizeNav = $(".ltn__utilize-menu, .overlay-menu"),
        $ltn__utilizeNavSubMenu = $ltn__utilizeNav.find(".sub-menu");

      /*Add Toggle Button With Off Canvas Sub Menu*/
      $ltn__utilizeNavSubMenu
        .parent()
        .prepend('<span class="menu-expand"></span>');

      /*Category Sub Menu Toggle*/
      $ltn__utilizeNav.on("click", "li a, .menu-expand", function (e) {
        var $this = $(this);
        if ($this.attr("href") === "#" || $this.hasClass("menu-expand")) {
          e.preventDefault();
          if ($this.siblings("ul:visible").length) {
            $this.parent("li").removeClass("active");
            $this.siblings("ul").slideUp();
            $this.parent("li").find("li").removeClass("active");
            $this.parent("li").find("ul:visible").slideUp();
          } else {
            $this.parent("li").addClass("active");
            $this
              .closest("li")
              .siblings("li")
              .removeClass("active")
              .find("li")
              .removeClass("active");
            $this.closest("li").siblings("li").find("ul:visible").slideUp();
            $this.siblings("ul").slideDown();
          }
        }
      });
    }
    mobileltn__utilizeMenu();

    /* ---------------------------------------------------------
              4. One Page Navigation ( jQuery Easing Plugin )
          --------------------------------------------------------- */
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
      $("a.page-scroll").bind("click", function (event) {
        var $anchor = $(this);
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $($anchor.attr("href")).offset().top,
            },
            1500,
            "easeInOutExpo"
          );
        event.preventDefault();
      });
    });

    /* --------------------------------------------------------
              10. Nice Select
          --------------------------------------------------------- */
    //   $('select').niceSelect();

    /* --------------------------------------------------------
              12. Product Details Page
          --------------------------------------------------------- */
    // $(".ltn__shop-details-large-img").slick({
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   arrows: false,
    //   fade: true,
    //   asNavFor: ".ltn__shop-details-small-img",
    // });
    // $(".ltn__shop-details-small-img").slick({
    //   slidesToShow: 4,
    //   slidesToScroll: 1,
    //   asNavFor: ".ltn__shop-details-large-img",
    //   dots: false,
    //   arrows: true,
    //   focusOnSelect: true,
    //   prevArrow:
    //     '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
    //   nextArrow:
    //     '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
    //   responsive: [
    //     {
    //       breakpoint: 992,
    //       settings: {
    //         slidesToShow: 4,
    //         slidesToScroll: 1,
    //       },
    //     },
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //       },
    //     },
    //     {
    //       breakpoint: 580,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //       },
    //     },
    //   ],
    // });
    /* --------------------------------------------------------
              14. LightCase jQuery Active
          --------------------------------------------------------- */
    $("a[data-rel^=lightcase]").lightcase({
      transition:
        "elastic" /* none, fade, fadeInline, elastic, scrollTop, scrollRight, scrollBottom, scrollLeft, scrollHorizontal and scrollVertical */,
      swipe: true,
      maxWidth: 1170,
      maxHeight: 600,
    });

    /* --------------------------------------------------------
              ## Related Product Slider One
          --------------------------------------------------------- */
    // $(".ltn__popular-product-widget-active").slick({
    //   arrows: false,
    //   dots: true,
    //   infinite: true,
    //   speed: 300,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   prevArrow:
    //     '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
    //   nextArrow:
    //     '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
    // });

    /* --------------------------------------------------------
              18. Blog Slider One
          --------------------------------------------------------- */
    // $(".ltn__blog-slider-one-active").slick({
    //   arrows: true,
    //   dots: false,
    //   infinite: true,
    //   speed: 300,
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   prevArrow:
    //     '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
    //   nextArrow:
    //     '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
    //   responsive: [
    //     {
    //       breakpoint: 1200,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 1,
    //         arrows: false,
    //         dots: true,
    //       },
    //     },
    //     {
    //       breakpoint: 992,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 1,
    //         arrows: false,
    //         dots: true,
    //       },
    //     },
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 1,
    //         arrows: false,
    //         dots: true,
    //       },
    //     },
    //     {
    //       breakpoint: 575,
    //       settings: {
    //         arrows: false,
    //         dots: true,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //       },
    //     },
    //   ],
    // });
    /* --------------------------------------------------------
              21. Testimonial Slider - 5
          --------------------------------------------------------- */
    // $(".ltn__testimonial-slider-5-active").slick({
    //   arrows: true,
    //   centerMode: false,
    //   centerPadding: "80px",
    //   dots: false,
    //   infinite: true,
    //   speed: 300,
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   prevArrow:
    //     '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
    //   nextArrow:
    //     '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
    //   responsive: [
    //     {
    //       breakpoint: 1200,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //       },
    //     },
    //     {
    //       breakpoint: 992,
    //       settings: {
    //         arrows: false,
    //         dots: true,
    //         centerMode: false,
    //         slidesToShow: 2,
    //         slidesToScroll: 1,
    //       },
    //     },
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         arrows: false,
    //         dots: true,
    //         centerMode: false,
    //         slidesToShow: 2,
    //         slidesToScroll: 1,
    //       },
    //     },
    //     {
    //       breakpoint: 580,
    //       settings: {
    //         arrows: false,
    //         dots: true,
    //         centerMode: false,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //       },
    //     },
    //   ],
    // });

    /* --------------------------------------------------------
              Newsletter Popup
          -------------------------------------------------------- */
  });

  $(window).on("load", function () {
    /*-----------------
              preloader
          ------------------*/
    if ($("#preloader").length) {
      var preLoder = $("#preloader");
      preLoder.fadeOut(1000);
    }
  });
})(jQuery);
