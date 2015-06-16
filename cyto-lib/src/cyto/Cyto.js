"use strict"

var CYTO = (CYTO) ? CYTO : {};
// library initialization function

var cyto = function(rendererType, canvasId) {

  $ = cyto = CYTO;

  //config
  $.rendererType  = rendererType;
  $.canvas        = document.getElementById(canvasId);
  $.sketch        = $.canvas.getAttribute('data-sketch');
  $.path          = '/sketches/'

  //initialize root subclasses
  $.utils           = new Utils();
  $.eventDispatcher = new EventDispatcher();
  $.view            = new View();
  $.errors          = new ErrorMessages();
  $.renderer        = new Renderer();
  $.loader          = new Loader();
  $.drawEngine      = new DrawEngine();
  $.ellipse         = new Ellipse();

  //2d primitives (direct call)
  $.rect     = new $.Rectangle().rect;
  $.triangle = new $.Triangle().triangle;

  //put root accesible props on $ object (global access)
  $.utils.accessRootProps($);

  //load sketch
  $.loader.loadSketch($.path + $.sketch, init);

  //initialize sketch
  function init() {
    //maximize canvas view
    $.reset();
    //start drawing engine
    $.start();
  }
};
