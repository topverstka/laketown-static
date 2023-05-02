$(document).ready(function() {

  let aos = AOS.init();

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
    bodyLock(false);
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
      setTimeout(step, 5000);
    }
    step();
  }($('header #slogans').children()));


  $('#mapBlock #filterBtn').on('click', function() {
    $(this).toggleClass('show');
    $('#mapBlock').find('.map-filter').toggleClass('active');

    if (window.innerWidth > 992) return;
    bodyLock();
  });



  //slider
  var sliderBlockWidth = $(document).find('#advantages .slider-images').width(),
    borderWidth = parseInt($(document).find('.container').css('margin-right')),
    sliderMargin = parseInt($(document).find('#advantages #advImages .slider-item').css('margin-right')),
    sliderWidth = sliderBlockWidth - borderWidth;

  if (window.innerWidth < 1200) {
    sliderWidth = window.innerWidth;
  }

  $(document).on('click', '.recall', function() {
    $(document).find('body').addClass('modal-open');
    $(document).find('.modal-callback').addClass('active');
    bodyLock(true);
  });

  $(document).on('click', '.modal__btn-close', function() {
    $(document).find('body').removeClass('modal-open');
    $(document).find('.modal.active').removeClass('active');
    bodyLock(false);
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

  setTimeout(() => {
    AOS.refresh()
  }, 5000)


  function getTopOffset(percents = 100) {
    return window.innerHeight / 100 * percents;
  }

  function scrollToAnchor(percents = 9) {
      const linkElems = document.querySelectorAll('[href^="#"]')
      if (!linkElems) return;
      for (let i = 0; i < linkElems.length; i++) {
          const link = linkElems[i];
          link.addEventListener('click', (e) => {
              e.preventDefault()
              let href = link.getAttribute('href')
              if (!href || href == "#") return;
              let anchor = document.querySelector(href)
              if (!anchor) return;
              if (anchor.classList.contains('b_modal')) return
              window.scroll({
                  top: anchor.getBoundingClientRect().top + pageYOffset - getTopOffset(percents),
                  left: 0,
                  behavior: 'smooth'
              })
          })
      }
  }
  scrollToAnchor(0);

  try {
    // gsap.registerPlugin(ScrollTrigger);

    // const bannerParallax = document.querySelector('.banner-wrapper');
    // gsap.to(bannerParallax, {
    //   yPercent: 80,
    //   duration: 10,
    //   ease: "easeInOut",
    //   force3D: true,
    //   scrollTrigger: {
    //     trigger: bannerParallax.parentElement,
    //     start: 'top bottom+=100',
    //     end: 'bottom + 100%',
    //     scrub: true,
    //     toggleClass: 'active',
    //     // markers: true // only for debugging purposes
    //   }
    // });


/*    const parkingParallax = document.querySelector('#parking .section-content img');
    gsap.fromTo(parkingParallax, {
      // yPercent: -70,
      y: -(window.outerHeight * 0.9),
    }, {
      y: window.outerHeight * 0.2,
      // yPercent: 50,
      duration: 10,
      ease: "easeInOut",
      force3D: true,
      scrollTrigger: {
          trigger: parkingParallax.parentElement.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          toggleClass: 'active',
          markers: true // only for debugging purposes
      },
      willChange: "transform",
      transform: "translateZ(0)",
      transition: "all 0.1s ease"
    });
*/  } catch {

  }


  function handleScroll(parallaxed, section) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const sectionRect = section.getBoundingClientRect();

    const y = (scrollTop + windowHeight - sectionRect.top) * 0.1;

    parallaxed.style.transform = `translateY(${y}px) translateZ(0)`;
  }

  let lastScrollTime = 0;

  function throttledHandler(parallaxed, section) {
    const now = Date.now();
    if (now - lastScrollTime >= 16) {
      handleScroll(parallaxed, section);
      lastScrollTime = now;
    }
  }

  const bannerParallax = document.querySelector('.banner-wrapper');
  if (bannerParallax) {
    const bannerSection = bannerParallax.parentElement;
  }

  const parkingParallax = document.querySelector('#parking .section-content img');
  if (parkingParallax) {
    const parkingSection = parkingParallax.parentElement.parentElement;
  }

  window.addEventListener('scroll', () => {
    if (bannerParallax) {
      handleScroll(bannerParallax, bannerSection)
    }
    if (parkingParallax) {
      handleScroll(parkingParallax, parkingSection)
    }
  });

  const telInputs = document.querySelectorAll('input[type="tel"]');
  telInputs.forEach(tel => {
    const maskOptions = {
      mask: '+7(999) 999-99-99',
      inputmode: 'tel',
    };

    new Inputmask(maskOptions).mask(tel);
  })

});