define(function () {

   /* DRAW ENGINE CLASS
   --------------------------------------------------- */

  var cyDrawEngine = function(root, options) {
    var self = this;

    self.options = options || {};

    root.eventDispatcher.apply(self); //add this class to the events class (dispatcher)

    self.start =  function(canvas, setFrameRate) {
      this.frameRate = setFrameRate || false;
      this.canvas    = canvas;
      this.context   = canvas.getContext('2d');
      this.lastRun   = getTimeNow();
      this.frameRate = false;
      this.fps       = 0;


      //TODO: figure out how to use an inheritance model to make this more modular
      if(cyto.setup && typeof(cyto.setup) === 'function') {
        cyto.setup();
      }

      self.animationId = window.requestAnimationFrame(function(time) {       
        self.animate.call(self, time); // self is the game
      });
    };
  };

  /* DRAW ENGINE PROTOTYPE
   --------------------------------------------------- */

  cyDrawEngine.prototype = {
    
    animate: function (time) {
      var self = this; // window.requestNextAnimationFrame() called by DOMWindow

      self.time = time;
      self.calcFps(time); // update fps time
        
      //if an update function has been registered, call it for each animation loop
      if(cyto.update && typeof(cyto.update) === 'function') {
        cyto.update();

        self.dispatchEvent({type: 'update', message: ''}); //emit update event
      }

      //if a draw function has been registered, call it for each animation loop
      if(cyto.draw && typeof(cyto.draw) === 'function') {
        
        if(self.options.clearTransforms)  { //DEPRECATED: TODO: move to canvas class
          self.context.setTransform(1, 0, 0, 1, 0, 0); //remove translations/transforms by seting to identity matrix
        }

        if(self.options.clearBackground)  { //DEPRECATED: TODO: move to canvas class
          self.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        cyto.draw(time);
      }

      if(self.frameRate) { //if specifying a framerate, don't use rAF
        setTimeout(function() {

          time = getTimeNow() + 1000/self.frameRate; //next scheduled cycle
          self.animate.call(self, time);

        }, 1000/self.frameRate);

      } else { //rAF is locked to monitor's sync, typically 60 Hz, so we can't adjust the FPS for it in itself 

        //requestionAnimationFrame() callback routine must itself call requestAnimationFrame() 
        //in order to animate another frame at the next repaint.
        self.animationId = window.requestAnimationFrame(function(time) {
          self.animate.call(self, time);
        });
      }
    },

    calcFps: function (time) {
      //calculates fps by taking frame delta, and then rounds to the nearest hundreth
       this.fps = Math.round(1 / ((getTimeNow() - this.lastRun) / 1000) * 100) / 100;
       this.lastRun = getTimeNow();
    },

    getFps: function () {
      return this.fps;
    },

    getTime: function() {
      return this.time;
    },

    delay: function(ms) {
      //TODO
    }
  };

   /* PRIVATE FUNCTIONS
   --------------------------------------------------- */

  var getTimeNow = function () {
    return new Date().getTime();
  };  
  
  return cyDrawEngine;
});