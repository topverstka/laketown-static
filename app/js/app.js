$(document).ready(function() {
    function loop(){
    $('.add-text')
      .animate({marginTop:90},6000)
      .animate({marginTop:40},6000, loop); // callback
  }

  loop();
});