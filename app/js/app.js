$(document).ready(function() {
    function loop(){
    $('.add-text')
      .animate({marginTop:90},6000)
      .animate({marginTop:40},6000, loop); // callback
  }

  //loop();


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
});