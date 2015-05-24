require.config({

  /**
   * cyLeap Addon Dependencies
   */

  paths: 

  { 
    leapjs: '/leapjs/leap-0.6.1' //bower_component
  },

  /**
   * cyLeap Addon Shims 
   * 
   * Shims are requires for libraries 
   * not pre-configured as AMD modules
   */

  shim: 

  { 
    'leapjs' : { exports: 'Leap' }
  }

});

define(['leapjs'], function (Leap) {

   /* cyLeap Class
   --------------------------------------------------- */

  var cyLeap = function(options) {

    var self = this;

    self.controller = new Leap.Controller({
      enableGestures: true
    });
    
    self.controller.on('connect', function() {

      //TODO: handle connection errors/timeouts/etc
      console.log("Leap device connected");
    });

    self.controller.connect();
  };

  /* Leap Prototype
   --------------------------------------------------- */

  cyLeap.prototype = {

    getFrame: function() {
      return this.controller.frame();
    }

  };

  return cyLeap;

});