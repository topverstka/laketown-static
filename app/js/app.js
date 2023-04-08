$(document).ready(function() {


  $('#menuOpen').on('click', function(){
    $('.top-menu').addClass('active');
  });
  $('#closeMenu').on('click', function(){
    $('.top-menu').removeClass('active');
  });


  (function(elements) {
    var i = -1;
    var className = 'active';
    if (!elements.length) {
      return false;
    }
    function step() {
      elements.eq(i).removeClass(className);
      if (++i >= elements.length) {
        i = 0;
      };
      elements.eq(i).addClass(className);
      setTimeout(step, 1200);
    }
    step();
  }($('header #slogans').children()));

  // parralax
  var headerHeight = $(document).find('header').outerHeight(),
    bannerHeight = $(document).find('.hero-wrapper').height(),
    compHeight = $(document).find('#advantages .companyName').outerHeight();
  console.log(headerHeight);
  $(window).on("scroll", function() {
    console.log($(window).scrollTop());
    if ($(window).scrollTop() > bannerHeight+240) {
      $(document).find('.hero-wrapper').addClass('fixed');
      $(document).find('#advantages').css('margin-top', bannerHeight+compHeight+80);
    }
    else {
      $(document).find('.hero-wrapper').removeClass('fixed');
      $(document).find('#advantages').css('margin-top', 0);

    }
  });
});