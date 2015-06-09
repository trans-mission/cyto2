var DrawEngine = function() {

  this._rootAccessible = true;


  cyto.eventDispatcher.apply(this); //add this class to the events class (dispatcher)

  this.context    = cyto.canvas.getContext('2d');
  this._lastRun   = this._getTimeNow();
  this._frameRate = 60;

  // getters and setters
  Object.defineProperty(this, 'fps', {
    get: function()  { return this._fps },
    enumerable: true
  });

  Object.defineProperty(this, 'frameRate', {
    get: function()  { return this._frameRate },
    set: function(r) { this._frameRate = r    },
    enumerable: true
  });

  this.start = function() {
    this._lastRun  = this._getTimeNow();
    this._fps      = 0; // frames per second

    if(cyto.setup && typeof(cyto.setup) === 'function') {
      cyto.setup();
    }

    this.animationId = window.requestAnimationFrame(function(time) {
      this.animate.call(this, time); // this is the game
    }.bind(this));
  };
};

/**
* @method animate
*/

DrawEngine.prototype.animate = function (time) {

  var self = this; // window.requestNextAnimationFrame() called by DOMWindow

  this.time = time;
  this._fps = this._calcFps(time); // update fps time
  this._lastRun = this._getTimeNow();

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

  if(this._frameRate) { //if specifying a framerate, don't use rAF
    setTimeout(function() {

      // 2nd arg passes next scheduled cycle
      this.animate.call(this, this._getTimeNow() + 1000/this._frameRate);

    }.bind(this), 1000/this._frameRate);

  } else { //rAF is locked to monitor's sync, typically 60 Hz, so we can't adjust the FPS for it in itself

    //requestionAnimationFrame() callback routine must itself call requestAnimationFrame()
    //in order to animate another frame at the next repaint.
    this.animationId = window.requestAnimationFrame( function(time) {
      this.animate.call(this, time);
    }.bind(this));
  }
};

/**
* @method _calcFps
*/

DrawEngine.prototype._calcFps = function (time) {
  //calculates fps by taking frame delta, and then rounds to the nearest hundreth
  return Math.round(1 / ((this._getTimeNow() - this._lastRun) / 1000) * 100) / 100;
};

/**
* @method _getTimeNow
* @returns {Number} Return the number of milliseconds since 1970/01/01:
*/

DrawEngine.prototype._getTimeNow = function() {

  return new Date().getTime();
};

/**
* @method getTime
*/

DrawEngine.prototype.getTime = function () {
  return this.time;
};

/**
* @method delay
*/

DrawEngine.prototype.delay = function (ms) {
  //TODO
};
