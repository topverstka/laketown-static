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
  $(window).on("scroll", function() {
    if ($(window).scrollTop() > bannerHeight+240) {
      $(document).find('.hero-wrapper').addClass('fixed');
      $(document).find('#advantages').css('margin-top', bannerHeight+compHeight+80);
    }
    else {
      $(document).find('.hero-wrapper').removeClass('fixed');
      $(document).find('#advantages').css('margin-top', 0);

    }
  });


  //sliders
/*  $('#advText').lightSlider({
    adaptiveHeight:false,
    autoWidth: true,
    mode: 'fade',
    item:1,
    slideMargin:0,
    loop:false,
    controls: false,
    pager:false,
    enableTouch: false,
    enableDrag: false
  });
  $('#advImgs').lightSlider({
    adaptiveHeight:false,
    item:2,
    slideMargin:20,
    loop:false,
    controls: false,
    pager:false,
    enableTouch: false,
    enableDrag: false
  });
*/

  //slider
  $(document).find('.adv-slider-nav').on('click', '.navBtn:not(".disabled")', function() {
    var currentBtn = $(this),
      navBlock = currentBtn.parent();
      qtyBlock = navBlock.find('.sliderQty'),
      sliderBlock = $(document).find('#'+navBlock.data('slider')),
      sliderAddBlock = $(document).find('#'+navBlock.data('slider-second')),
      qtyAll = qtyBlock.find('.allSliders'),
      qtyCurrent = qtyBlock.find('.curSlider'),
      currentSlide = parseInt(qtyBlock.data('active')),
      newSlide = 1,
      nextSlide = 1;


    console.log(sliderAddBlock);

    if (currentBtn.hasClass('nextBtn') ) {
      newSlide = currentSlide+1;
      nextSlide = currentSlide+2;

      sliderBlock.find('[data-id="'+currentSlide+'"]').removeClass('current');
      sliderBlock.find('[data-id="'+newSlide+'"]').addClass('current');
      qtyBlock.data('active', newSlide);
      qtyCurrent.text(newSlide);

      sliderAddBlock.find('[data-id="'+newSlide+'"]').addClass('current').removeClass('active').delay( 1000 );
      sliderAddBlock.find('[data-id="'+currentSlide+'"]').removeClass('current').addClass('prev').delay( 1000 );
      sliderAddBlock.find('[data-id="'+nextSlide+'"]').addClass('active');

      navBlock.find('.navBtn').removeClass('disabled');
      if (newSlide === parseInt(qtyAll.text())) {
        currentBtn.addClass('disabled');

      }


    } else if (currentBtn.hasClass('prevBtn')) {
      newSlide = currentSlide-1;
      prevSlide = currentSlide-2;
      nextSlide = currentSlide+1;

      console.log(newSlide);

      sliderBlock.find('[data-id="'+currentSlide+'"]').removeClass('current').delay( 800 );
      sliderBlock.find('[data-id="'+newSlide+'"]').addClass('current');
      qtyBlock.data('active', newSlide);
      qtyCurrent.text(newSlide);

      sliderAddBlock.find('[data-id="'+newSlide+'"]').addClass('current').removeClass('prev');
      sliderAddBlock.find('[data-id="'+currentSlide+'"]').removeClass('current').addClass('active').delay( 1000 );
      sliderAddBlock.find('[data-id="'+prevSlide+'"]').removeClass('prev');
      sliderAddBlock.find('[data-id="'+nextSlide+'"]').removeClass('active');


      navBlock.find('.navBtn').removeClass('disabled');

      if (newSlide === 1) {
        currentBtn.addClass('disabled');
      }

    }

  });



});