/**
 * @class:  cyMouse
 * @author: Mikhail Mansion
 */

define(function() {

  //cyMouse should only be instantiated through Cyto (main)
  var cyMouse = function(target) {};

  /* Prototype inheritance
     -------------------------------------------------- */
  var p = cyMouse.prototype;

  /* Public Methods
     -------------------------------------------------- */

  p._eventsList = ['mouseMove', 'mouseDown', 'mouseUp'];

  Object.defineProperty(p, 'mouseX', {
    get: function()  { return this._mouseX },
    set: function(x) { this._mouseX = x;   }
  });

  Object.defineProperty(p, 'mouseY', {
    get: function()  { return this._mouseY },
    set: function(y) { this._mouseY = y;   }
  });

  /* Private members
     -------------------------------------------------- */
  p._mouseMove = function (e) {
    if(this.dispatchEvent) {
      e = this.coords.windowToCanvas(this.canvas, e.pageX, e.pageY);
      this.dispatchEvent({type: 'mouseMove', x: e.x, y: e.y });
    }
  },

  p._mouseDown = function (e) {
    if(this.dispatchEvent) {
      e = this.coords.windowToCanvas(this.canvas, e.pageX, e.pageY);
      this.dispatchEvent({type: 'mouseDown', x: e.x, y: e.y });
    }
  },

  p._mouseUp = function (e) {
    if(this.dispatchEvent) {
      e = this.coords.windowToCanvas(this.canvas, e.pageX, e.pageY);
      this.dispatchEvent({type: 'mouseUp', x: e.x, y: e.y });
    }
  };
  
  return cyMouse;
});