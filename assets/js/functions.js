// // wScroll
// $(window).scroll(function() {
//   var wScroll = $(this).scrollTop();
//
//   // var $hscContainer = $('.home-shop-carousel');
//   // var $hsc1 = $hscContainer.find('.hsc1');
//   var $hscContainer2 = $('.hscContainer2');
//   var $hsc2 = $hscContainer2.find('.hsc2');
//   var $hscContainer3 = $('.hscContainer3');
//   var $hsc3 = $hscContainer3.find('.hsc3');
//
//   // $('.igpin-thumb').css('opacity', '0');
//   // var $box = $(".product-box", tr).find("tr:first"); // $('table.formquestions').find("tr:first")
//
//   // Home Shop Carousel 2
//   if(wScroll > $hscContainer2.offset().top - ($(window).height() / 1)) {
//     $hsc2.each(function(i){
//       setTimeout(function(){
//         $hsc2.eq(i).addClass('product-animation');
//       }, 150 * (i+1));
//     });
//   }
//   // Home Shop Carousel 3
//   if(wScroll > $hscContainer3.offset().top - ($(window).height() / 1)) {
//     $hsc3.each(function(i){
//       setTimeout(function(){
//         $hsc3.eq(i).addClass('product-animation');
//       }, 150 * (i+1));
//     });
//   }
// });

// Add Classes
$(function mobileNav() {
  $('.mobile-nav-toggle, .product-nav-toggle').on('click', function(){
    var status = $(this).hasClass('is-open');
    if(status){ $('.mobile-nav-toggle, .mobile-nav, .product-nav-toggle, .product-nav').removeClass('is-open'); }
    else { $('.mobile-nav-toggle, .mobile-nav, .product-nav-toggle, .product-nav').addClass('is-open'); }
  });
})

$('.open-icons, .close-icons').click( function() {
    $(".share-button").toggleClass("is-open");
});

$('.product-menu').click( function() {
    $(".product-menu").toggleClass("is-open");
});


// Signup Forms
$(function(){
  $('.form-display .mc-field-group input').focusout(function(){
    var text_val = $(this).val();
    if(text_val === "") {
      $(this).removeClass('has-value');
    } else {
      $(this).addClass('has-value');
    }
  });
});


// Image Zoom
// $(function() {
//   $('.home-image-download, .product-images').hover(
//     function(){
//       $(this).find(".homeback, .prdback").toggleClass("zoombac");
//     },
//     function(){
//       $(this).find(".homeback, .prdback").removeClass("zoombac");
//     }
//   )
// })



function instaShake(){

  var $instaThumb = $('.insta-thumb');
  var $pinThumb = $('.pin-thumb');
  var randNumInsta = Math.floor(Math.random() * $instaThumb.length) +1
  var randNumPin = Math.floor(Math.random() * $pinThumb.length) +1

  $instaThumb.eq(randNumInsta).addClass('ani-shake')
    .siblings().removeClass('ani-shake');

  $pinThumb.eq(randNumPin).addClass('ani-shake')
    .siblings().removeClass('ani-shake');
}

$(function(){
  setInterval(function(){instaShake();}, 4000);
});

// Share Button Old
// postShareButtonClick = $(function (){
//     var buttonWrapper = $(".share-button"),
//         button = $(".share-button > a"),
//         icons = $(".share-button > .icon-wrapper"),
//         close = $(".close-social-icons");
//
//     function init(){
//         button.on("click", toggle);
//         close.on("click", closeIcons);
//     }
//
//     function toggle(e){
//         if (buttonWrapper.hasClass("active")){
//             closeIcons();
//         } else{
//             openIcons();
//         }
//         e.preventDefault();
//     }
//
//     function openIcons(){
//         buttonWrapper.addClass("active");
//         button.addClass("hidden");
//         buttonWrapper.animate({width: "250"}, 500);
//         icons.animate({left: "0"}, 500);
//     }
//
//     function closeIcons(){
//         buttonWrapper.removeClass("active");
// 		  button.removeClass("hidden");
//         icons.animate({left: "-250"}, 0);
//         buttonWrapper.animate({width: "170"}, 0);
//     }
//
//     init();
// });





// // Carousel
// $(function() {
//
//   var width =  $('.shop-slide').width();
//   var animationSpeed = 1000;
//   var pause = 3000;
//   var currentSlide = 1;
//
//   var $carousel = $('.home-shop-carousel');
//   var $slider = $('.shop-slider');
//   var $slideContainter = $slider.find('.shop-slides');
//   var $slides = $slideContainter.find('.shop-slide');
//
//   var interval;
//
//   function startSlider() {
//     interval = setInterval(function() {
//       $slideContainter.animate({'margin-left': '-='+width}, animationSpeed, function() {
//         if (++currentSlide === $slides.length) {
//           currentSlide = 1;
//           $slideContainter.css('margin-left', 0);
//         }
//
//       });
//     }, pause);
//   }
//
//   function stopSlider(){
//     clearInterval(interval);
//   }
//
//   $carousel.on('mouseenter', stopSlider).on('mouseleave', startSlider);
//
//   startSlider();
// });


// $sliderWrap.on('mouseenter', stopSlider).on('mouseleave', startSlider);


// Working Slider
$(function() {

    //Cache DOM
    var $sliderWrap = $('#slider-wrap');
    var $slider = $('#slider');
    var $slideContainer = $slider.find('.slides');
    var $slides = $slideContainer.find('.slide');
    var $slideCount = $slides.length;
    var $slideImg = $slides.find('img');
    var $toggleLeft = $sliderWrap.find('#toggle-left');
    var $toggleRight = $sliderWrap.find('#toggle-right');
    // var $pauseBtn = $sliderWrap.find('#pause-btn');
    // var $playBtn = $sliderWrap.find('#play-btn');
    var $sliderPaging = $('#slider-paging');
    var $sliderPages = $sliderPaging.find('.slider-pages');
    var $sliderPage = $sliderPages.find('.slider-page');

    //Configuration
    var slide;
    var animation = slide;
    var animationSpeed = 1000;
    var toggleClickSpeed = 400;
    var pagingClickSpeed = 400;
    var animationEasing = "swing";
    var toggleClickEasing = "swing";
    var pagingClickEasing = "linear";
    var animationQueue = false;
    var toggleClickQueue = false;
    var pagingClickQueue = false;
    var pause = 3000;
    var pauseOnHover = false;

    //Initialize global variables
    var $activePage;
    var $activeSlide;
    var currentSlide = 1;
    var interval;
    var maxHeight;
    var $nextSlide;
    var width = $slider.width();

    var setWidth = function() {
        width = $slider.width();
    }
    $(window).resize(function() {
        setWidth();
    });
    var addActive = function () {
        $activePage = $('.slider-page:nth-of-type(' + currentSlide + ')').addClass('active');
        $activeSlide = $('.slide:nth-of-type(' + currentSlide + ')').addClass('active');
    }
    addActive();
    var removeActive = function () {
        $activePage.removeClass('active');
        $activeSlide.removeClass('active');
    }
    var showSlides = function (slides) {
        slides.each(function () {
            $(this).css({'opacity': 1})
        });
    }
    var hideSlides = function (slides) {
        slides.each(function () {
            $(this).css({'opacity': 0})
        });
    }
    $i = $slideCount;
    $slides.each(function( index ) {
        $(this).css({'z-index': $i--});
        if ( !$(this).hasClass('active') ) {
            hideSlides($(this));
        }
    });

    // $sliderWrap.hover(function () {
    //   $(this).toggleClass("stop-slider");
    // });


    var isPaused = function () {
      // $sliderWrap.on('mouseenter').on('mouseleave');
      // if ( $sliderWrap.hasClass("stop-slider") ) {
      //     return true;
      // } else {
      //     return false;
      // }
        // if ( $pauseBtn.is(":hidden") ) {
        //     return true;
        // } else {
        //     return false;
        // }
    }
    var isPlaying = function () {
      // $sliderWrap.on('mouseleave');
        // if ( $playBtn.is(":hidden") ) {
        //     return true;
        // } else {
        //     return false;
        // }
    }


    var moveUp = function (itemArr) {
        itemArr.each(function() {
            var zIndex = $(this).css('z-index');
            if ( zIndex == $slideCount ) {
                $(this).css({'z-index': 1});
            } else {
                $(this).css({'z-index': ++zIndex});
            }
        });
    }
    var moveDown = function (itemArr) {
        itemArr.each(function () {
            var zIndex = $(this).css('z-index');
            if ( zIndex == 1 ) {
                $(this).css({'z-index': $slideCount});
            } else {
                $(this).css({'z-index': --zIndex});
            }
        });
    }
    var slideLeft = function (slideLength, speed, easing, queue) {
        var dfd = $.Deferred();
        if ( currentSlide === 1 ) {
            $nextSlide = $('.slide:nth-of-type(' + $slideCount + ')');
        } else {
            $nextSlide = $('.slide:nth-of-type(' + (currentSlide - 1) + ')');
        }
        $nextSlide.css({'margin-left': -slideLength, 'opacity': 1});
        $activeSlide.add($nextSlide).addClass('animating');
        moveDown($slides);
        $activeSlide.add($nextSlide).stop().animate({'margin-left': '+=' + slideLength}, {"duration": speed, "easing": easing, "queue": queue}).promise().then(function () {
            $activeSlide.css({'margin-left': 0, 'opacity': 0});
            $activeSlide.add($nextSlide).removeClass('animating');
            if (currentSlide === 1) {
                currentSlide = $slideCount;
            } else {
                currentSlide--;
            }
            removeActive();
            addActive();
            dfd.resolve();
        });
        return dfd.promise();
    }
    $toggleLeft.click(function(){
        if ( $activeSlide.add($nextSlide).hasClass('animating') ) {
            return;
        } else {
            if ( !isPaused() ) {
                stopSlider();
            }
            $.when(slideLeft(width, toggleClickSpeed, toggleClickEasing, toggleClickQueue)).then(function () {
                if ( !isPaused() ) {
                    startSlider();
                }
            });
        }
    });
    var slideRight = function (slideLength, speed, easing, queue) {
        var dfd = $.Deferred();
        if ( currentSlide === $slideCount ) {
            $nextSlide = $('.slide:nth-of-type(1)');
        } else {
            $nextSlide = $('.slide:nth-of-type(' + (currentSlide + 1) + ')');
        }
        $nextSlide.css({'margin-left': slideLength, 'opacity': 1});
        $activeSlide.add($nextSlide).addClass('animating');
        $activeSlide.add($nextSlide).stop().animate({'margin-left': '-=' + slideLength}, {"duration": speed, "easing": easing, "queue": queue}).promise().then(function () {
            $activeSlide.css({'margin-left': 0, 'opacity': 0});
            $activeSlide.add($nextSlide).removeClass('animating');
            moveUp($slides);
            if (currentSlide === $slideCount) {
                currentSlide = 1;
            } else {
                currentSlide++;
            }
            removeActive();
            addActive();
            dfd.resolve();
        });
        return dfd.promise();
    }
    $toggleRight.click(function (){
        if ( $activeSlide.add($nextSlide).hasClass('animating') ) {
            return;
        } else {
            if ( !isPaused() ) {
                stopSlider();
            }
            $.when(slideRight(width, toggleClickSpeed, toggleClickEasing, toggleClickQueue)).then(function () {
                if ( !isPaused() ) {
                    startSlider();
                }
            });
        }
    });
    var keepSlidingLeft = function (count, speed, easing, queue) {
        if ( count <= 0 ) {
            return;
        }
        $.when(slideLeft(width, speed, easing, queue)).then(function () {
            keepSlidingLeft(count - 1, speed, easing, queue);
        })
    }
    var keepSlidingRight = function (count, speed, easing, queue) {
        if ( count <= 0 ) {
            return;
        }
        $.when(slideRight(width, speed, easing, queue)).then(function () {
            keepSlidingRight(count - 1, speed, easing, queue);
        })
    }
    $sliderPage.click(function (){
        if ( $activeSlide.add($nextSlide).hasClass('animating') ) {
            return;
        } else {
            var pageId = $(this).attr('id');
            var pageNum = pageId.split('-').pop().trim();
            if ( !isPaused() ) {
                stopSlider();
            }
            if ( pageNum < currentSlide ) {
                var count = currentSlide - pageNum;
                keepSlidingLeft(count, pagingClickSpeed, pagingClickEasing, pagingClickQueue);
            } else {
                var count = pageNum - currentSlide;
                keepSlidingRight(count, pagingClickSpeed, pagingClickEasing, pagingClickQueue);
            }
            if ( !isPaused() ) {
                startSlider();
            }
        }
    });
    var startSlider = function () {
        interval = setInterval(function () {
            slideRight(width, animationSpeed, animationEasing, animationQueue);
        }, pause);
    }
    startSlider();
    var stopSlider = function () {
        clearInterval(interval);
    }

});
