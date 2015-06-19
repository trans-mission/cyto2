var DrawEngine = function() {

  var $ = this;

  $._rootAccessible = true;
  $._noLoop         = false;
  $._frameRate      = 60;
  $._lastRun        = $._getTimeNow();

  //add $ class to the events class (dispatcher)
  cyto.eventDispatcher.apply($);

  // getters and setters
  Object.defineProperty($, 'fps', {
    get: function()  { return $._fps },
    enumerable: true
  });

  Object.defineProperty($, 'frameRate', {
    get: function()  { return $._frameRate },
    set: function(r) { $._frameRate = r    },
    enumerable: true
  });

  Object.defineProperty($, 'isLooping', {
    get: function()     { return !$._noLoop },
    set: function(bool) { $._noLoop = !bool },
    enumerable: true
  });

  $.start = function() {
    $._lastRun = $._getTimeNow();
    $._fps     = 0; // frames per second

    if(cyto.setup && typeof(cyto.setup) === 'function') {
      cyto.setup();
    }

    $.animationId = window.requestAnimationFrame(function(time) {
      $.animate.call($, time);
    });
  };
};

/**
* @method animate
*/

DrawEngine.prototype.animate = function (time) {
  var $ = this; // window.requestNextAnimationFrame() called by DOMWindow

  $._time = time;
  $._fps = $._calcFps(time); // update fps time
  $._lastRun = $._getTimeNow();

  //if an update function has been registered, call it for each animation loop
  if(cyto.update && typeof(cyto.update) === 'function') {
    cyto.update();

    //global update event
    cyto.dispatchEvent({type: 'update', message: ''}); //emit update event
  }

  //if a draw function has been registered, call it for each animation loop
  if(cyto.draw && typeof(cyto.draw) === 'function') {
    cyto.draw(time);
  }

  if($._noLoop) return;

  if($._frameRate) { //if specifying a framerate, don't use rAF
    setTimeout(function() {

      // 2nd arg passes next scheduled cycle
      $.animate.call($, $._getTimeNow() + 1000/$._frameRate);

    }, 1000/$._frameRate);

  } else { //rAF is locked to monitor's sync, typically 60 Hz, so we can't adjust the FPS for it in itself

    //requestionAnimationFrame() callback routine must itself call requestAnimationFrame()
    //in order to animate another frame at the next repaint.
    $.animationId = window.requestAnimationFrame( function(time) {
      $.animate.call($, time);
    });
  }
};

/**
* @method _calcFps
*/

DrawEngine.prototype._calcFps = function (time) {
  var $ = this;

  //calculates fps by taking frame delta, and then rounds to the nearest hundreth
  return Math.round(1 / (($._getTimeNow() - $._lastRun) / 1000) * 100) / 100;
};

/**
* @method _getTimeNow
* @returns {Number} Return the number of milliseconds since 1970/01/01:
*/

DrawEngine.prototype._getTimeNow = function() {

  return new Date().getTime();
};

/**
* @method noLoop
*/

DrawEngine.prototype.noLoop = function () {
  var $ = this;

  $._noLoop = true;
};

/**
* @method getTime
*/

DrawEngine.prototype.getTime = function () {
  var $ = this;

  return $._time;
};

/**
* @method delay
*/

DrawEngine.prototype.delay = function (ms) {
  //TODO
};
