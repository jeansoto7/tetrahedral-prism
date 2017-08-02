// wScroll
$(window).scroll(function() {
  var wScroll = $(this).scrollTop();

  var $hscContainer2 = $('.hscContainer2');
  var $hsc2 = $hscContainer2.find('.hsc2');
  var $hscContainer3 = $('.hscContainer3');
  var $hsc3 = $hscContainer3.find('.hsc3');

  // Home Shop Carousel 2
  if(wScroll > $hscContainer2.offset().top - ($(window).height() / 1)) {
    $hsc2.each(function(i){
      setTimeout(function(){
        $hsc2.eq(i).addClass('product-animation');
      }, 150 * (i+1));
    });
  }
  // Home Shop Carousel 3
  if(wScroll > $hscContainer3.offset().top - ($(window).height() / 1)) {
    $hsc3.each(function(i){
      setTimeout(function(){
        $hsc3.eq(i).addClass('product-animation');
      }, 150 * (i+1));
    });
  }
});
