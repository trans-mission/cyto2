/**
* Cyto View Class
*
* @class View
*/

var View = function() {

  this._rootAccessible = true;
  this.canvas = cyto.canvas;

  cyto.eventDispatcher.apply(this);
};

/**
* reset
*
* @method reset
*/

View.prototype.reset = function () {

  this.canvas.width  = window.innerWidth;
  this.canvas.height = window.innerHeight;
};
