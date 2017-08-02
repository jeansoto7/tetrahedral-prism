// wScroll
$(window).scroll(function() {
  var wScroll = $(this).scrollTop();

  var $fbtuContainer = $('.fbtu-images');
  var $fbtu1 = $fbtuContainer.find('.fbtu-thumb1');
  var $fbtu2 = $fbtuContainer.find('.fbtu-thumb2');

  var $instaContainer = $('.contact-instagram');
  var $instaThumb = $instaContainer.find('.insta-thumb');
  var $pinContainer = $('.contact-pinterest');
  var $pinThumb = $pinContainer.find('.pin-thumb');

  // Instagram
  if(wScroll > $instaContainer.offset().top - ($(window).height() / 1)) {
    $instaThumb.each(function(i){
      setTimeout(function(){
        $instaThumb.eq(i).addClass('product-animation');
      }, 150 * (i+1));
    });
  }

  // Pinterest
  if(wScroll > $pinContainer.offset().top - ($(window).height() / 1)) {
    $pinThumb.each(function(i){
      setTimeout(function(){
        $pinThumb.eq(i).addClass('product-animation');
      }, 150 * (i+1));
    });
  }

  // Facebook/Tumblr
  $fbtu1.css('background-position','center -'+ wScroll/1.5 +'px');
  $fbtu2.css('background-position','center +'+ wScroll/1.5 +'px');
});
