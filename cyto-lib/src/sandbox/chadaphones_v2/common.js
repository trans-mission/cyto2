$(function() {

  "use strict";
    
  sc.use("prototype");
    
  timbre.setup({f64:true});
  if (timbre.envmobile) {
      timbre.setup({samplerate:timbre.samplerate * 0.5});
  }
  
  var nowPlaying;
    
  var onreset = function() {
    nowPlaying = null;
  };
    
    timbre.on("play", function() {

    }).on("pause", onreset).on("reset", onreset).amp = 0.6;
    
    function playCode(code) {
     
        if (timbre.isPlaying && nowPlaying === code) {
            
        } else {
            timbre.reset();
            eval(code);
            nowPlaying = code;
        }
    } 


    $('button').click( function () {

        $(this).toggleClass('pause');

        if($(this).hasClass('pause')) {

          timbre.reset();
          play();

        } else {
          timbre.reset();
          timbre.pause();
        }
    });

  
});
