$(document).ready(function() {
  function lockBody() {
    const DEFAULT_SCROLLBAR_WIDTH = getScrollbarWidth();
    document.body.classList.add("_lock");
    document.body.style.paddingRight = `${DEFAULT_SCROLLBAR_WIDTH}px`;
  }
  function unlockBody() {
    const DEFAULT_SCROLLBAR_WIDTH = getScrollbarWidth();
    document.body.classList.remove("_lock");
    document.body.style.paddingRight = '';
  }
  function getScrollbarWidth() {
    return window.innerWidth - document.body.offsetWidth;
  }
  function bodyLock(con) {
    if (con === true) {
      lockBody();
    } else if (con === false) {
      unlockBody();
    } else if (con === undefined) {
      if (!document.body.classList.contains("_lock")) {
        lockBody();
      } else {
        unlockBody();
      }
    } else {
      console.error("Неопределенный аргумент у функции bodyLock()");
    }
  }

  $('#menuOpen').on('click', function(){
    $('.top-menu').addClass('active');
    bodyLock(true);
  });
  $('#closeMenu').on('click', function(){
    $('.top-menu').removeClass('active');
    bodyLock(false);
  });

  // menu click anchor
  $('.top-menu .menu-item.anchor').on('click', function() {
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







  $('#mapBlock #filterBtn').on('click', function() {
    $(this).toggleClass('show');
    $('#mapBlock').find('.map-filter').toggleClass('active');
  });



  //slider
  var sliderBlockWidth = $(document).find('#advantages .slider-images').width(),
    borderWidth = parseInt($(document).find('.container').css('margin-right')),
    sliderMargin = parseInt($(document).find('#advantages #advImages .slider-item').css('margin-right')),
    sliderWidth = sliderBlockWidth - borderWidth;

  console.log(window.innerWidth);
  if (window.innerWidth < 1200) {
    sliderWidth = window.innerWidth;
  }
  console.log(sliderWidth);


  $(document).find('#advantages #advImages .slider-item').css('width', sliderWidth);

  var sliderBlockWidthWork = $(document).find('#buildingStage #sliderStages').width(),
    borderWidthWork = parseInt($(document).find('.container').css('margin-left')),
    sliderMarginWork = parseInt($(document).find('#buildingStage .slider-item').css('padding-right')),
    sliderWidthWork = (sliderBlockWidthWork - borderWidthWork+sliderMarginWork) * 0.7;

  if (window.innerWidth < 768) {
    sliderWidthWork = window.innerWidth;
  }

  $(document).find('#buildingStage #sliderStages').css({'padding-left': borderWidthWork});
  $(document).find('#buildingStage .slider-item').css({'width': sliderWidthWork});
  $(document).find('#buildingStage .slider-btns').css({'width': sliderWidthWork, 'margin-left': borderWidthWork});

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

      if (window.innerWidth < 1200) {

        var itemWidth = sliderAddBlock.find('.slider-item').width();
        sliderAddBlock.find('.slider-wrapper').css('transform', 'translateX(-' + (parseFloat(currentSlide) * parseFloat(itemWidth)) + 'px)');

      }


    } else if (currentBtn.hasClass('prevBtn')) {
      newSlide = currentSlide-1;
      prevSlide = currentSlide-2;
      nextSlide = currentSlide+1;


      sliderBlock.find('[data-id="'+currentSlide+'"]').removeClass('current').delay( 800 );
      sliderBlock.find('[data-id="'+newSlide+'"]').addClass('current');
      qtyBlock.data('active', newSlide);
      qtyCurrent.text(newSlide);

      sliderAddBlock.find('[data-id="'+newSlide+'"]').addClass('current').removeClass('prev');
      sliderAddBlock.find('[data-id="'+currentSlide+'"]').removeClass('current').addClass('active').delay( 1000 );
 //     sliderAddBlock.find('[data-id="'+prevSlide+'"]').removeClass('prev');
      sliderAddBlock.find('[data-id="'+nextSlide+'"]').removeClass('active');

      navBlock.find('.navBtn').removeClass('disabled');

      if (newSlide === 1) {
        currentBtn.addClass('disabled');
      }
      if (window.innerWidth < 1200) {
        var itemWidth = sliderAddBlock.find('.slider-item').width();
        sliderAddBlock.find('.slider-wrapper').css('transform', 'translateX(-' + ((parseFloat(qtyCurrent.text()) - 1) * parseFloat(itemWidth)) + 'px)');
      }

    }





  });

  //slider buying
  $(document).find('#buyingServices').on('click', '.navBtn:not(".disabled")', function() {
    var currentBtn = $(this),
      navBlock = currentBtn.parent(),
      sliderBlock = $(document).find('#'+navBlock.data('slider')),
      qtySliders = sliderBlock.find('.slider-item').length,
      qtyCurrent = sliderBlock.find('.slider-item.active').data('id'),
      newSlide = 1,
      nextSlide = 1,
      slideMove = parseInt(sliderBlock.data('items'));

      var blockWidth = sliderBlock.width(),
        itemWidth = sliderBlock.find('.slider-item').width() + parseInt( sliderBlock.find('.slider-item').css('padding-right') );
    if (currentBtn.hasClass('nextBtn') ) {
      var last = qtySliders-parseInt(sliderBlock.data('items'));

      sliderBlock.css('transform', 'translateX(-' + (parseFloat(qtyCurrent)*parseFloat(itemWidth)) + 'px)');
      qtyCurrent++;
      sliderBlock.find('.slider-item.active').removeClass('active');
      sliderBlock.find('.slider-item[data-id="' + qtyCurrent + '"]').addClass('active');
      navBlock.find('.navBtn').removeClass('disabled');
      if (qtySliders < parseInt(qtyCurrent + slideMove)) {
        currentBtn.addClass('disabled');

      }

    } else if (currentBtn.hasClass('prevBtn')) {


      var last = qtySliders-parseInt(sliderBlock.data('items'));
      qtyCurrent--;
      sliderBlock.css('transform', 'translateX(-' + (parseFloat(qtyCurrent - 1)*parseFloat(itemWidth)) + 'px)');
      sliderBlock.find('.slider-item.active').removeClass('active');
      sliderBlock.find('.slider-item[data-id="' + qtyCurrent + '"]').addClass('active');
      navBlock.find('.navBtn').removeClass('disabled');
      if (qtyCurrent == 1) {
        currentBtn.addClass('disabled');

      }

    }

  });

  //slider buying
  $(document).find('#buildingStage').on('click', '.navBtn:not(".disabled")', function() {
    var currentBtn = $(this),
      navBlock = currentBtn.parent();
      sliderBlock = $(document).find('#'+navBlock.data('slider')),
      qtySliders = sliderBlock.find('.slider-item').length,
      qtyCurrent = sliderBlock.find('.slider-item.active').data('id'),
      newSlide = 1,
      nextSlide = 1,
      slideMove = parseInt(sliderBlock.data('items'));

      var blockWidth = sliderBlock.width(),
        itemWidth = sliderBlock.find('.slider-item').width() + parseInt( sliderBlock.find('.slider-item').css('padding-right') );
    if (currentBtn.hasClass('nextBtn') ) {
      var last = qtySliders-parseInt(sliderBlock.data('items'));

      sliderBlock.css('transform', 'translateX(-' + (parseFloat(qtyCurrent)*parseFloat(itemWidth)) + 'px)');
      qtyCurrent++;
      sliderBlock.find('.slider-item.active').removeClass('active');
      sliderBlock.find('.slider-item[data-id="' + qtyCurrent + '"]').addClass('active');
      navBlock.find('.navBtn').removeClass('disabled');
      if (qtySliders < parseInt(qtyCurrent + slideMove)) {
        currentBtn.addClass('disabled');

      }

    } else if (currentBtn.hasClass('prevBtn')) {


      var last = qtySliders-parseInt(sliderBlock.data('items'));
      qtyCurrent--;
      sliderBlock.css('transform', 'translateX(-' + (parseFloat(qtyCurrent - 1)*parseFloat(itemWidth)) + 'px)');
      sliderBlock.find('.slider-item.active').removeClass('active');
      sliderBlock.find('.slider-item[data-id="' + qtyCurrent + '"]').addClass('active');
      navBlock.find('.navBtn').removeClass('disabled');
      if (qtyCurrent == 1) {
        currentBtn.addClass('disabled');

      }

    }

  });


  $(document).on('click', '.recall', function() {
    $(document).find('body').addClass('modal-open');
    $(document).find('.modal').addClass('active');
  });

  $(document).on('click', '#closeModal', function() {
    $(document).find('body').removeClass('modal-open');
    $(document).find('.modal').removeClass('active');
  });



  $(document).on('click', '#apptMore', function() {
    // временно добавляем блок - потом через аякс


  });

  // select
  jQuery(function($){
    $(document).mouseup( function(e){ // событие клика по веб-документу
      var div = $( ".input-select.active" ); // тут указываем ID элемента
      if ( !div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
        div.removeClass('active'); // скрываем его
      }
    });
  });


  $(document).on('click', '.input-select__input', function() {
    $(this).parent().toggleClass('active');
  });

  $(document).on('click', '.input-select.active .dropdown-item', function() {
    var block = $(this).parent().parent(),
      title = $(this).text(),
      val = $(this).data('val');

    block.find('[data-id="inputTitle"]').val(title);
    block.find('[data-id="inputValue"]').val(val);

    block.toggleClass('active');
  });
});