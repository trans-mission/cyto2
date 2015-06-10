/**
* Cyto View Class
*
* @class View
*/

var View = function() {

  var _ = this;

  _._rootAccessible = true;
  _.canvas = cyto.canvas;

  cyto.eventDispatcher.apply(_);

  // add global event handlers
  var _resetTO;
  window.onresize = function() {
    if(_resetTO) clearTimeout(_resetTO);
    _resetTO = setTimeout(function() {
      _.reset();
    }, 180);
  };
};

/**
* reset
*
* @method reset
*/

View.prototype.reset = function () {
  var _ = this;
  _.canvas.width  = window.innerWidth;
  _.canvas.height = window.innerHeight;
};
