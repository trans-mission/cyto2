/**
* Cyto View Class
*
* @class View
*/

var View = function() {

  var $ = this;

  $._rootAccessible = true;
  $.canvas = cyto.canvas;

  cyto.eventDispatcher.apply($);

  // add global event handlers
  var _resetTO;
  window.onresize = function() {
    if(_resetTO) clearTimeout(_resetTO);
    _resetTO = setTimeout($.reset.bind($), 180);
  };
};

/**
* reset
*
* @method reset
*/

View.prototype.reset = function (resize) {
  var $ = this;
  $.canvas.width  = window.innerWidth;
  $.canvas.height = window.innerHeight;

  //TODO: implement a redraw function for resizing when
  // the noLoop option is being used
  // if(!cyto.isLooping()) {
  //   cyto.draw();
  // }
  // //console.log(cyto.drawing);
};
