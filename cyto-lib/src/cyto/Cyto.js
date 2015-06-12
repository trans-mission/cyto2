"use strict"

// library initialization function

var cyto = function(rendererType, canvasId) {


    $ = cyto = CYTO;

    $.rendererType  = rendererType;
    $.canvas = document.getElementById(canvasId);
    $.sketch = $.canvas.getAttribute('data-sketch');
    $.path   = '/sketches/'

    //initialize all subclasses
    $.utils           = new Utils();
    $.eventDispatcher = new EventDispatcher();
    $.view            = new View();
    $.errors          = new ErrorMessages();
    $.renderer        = new Renderer();
    $.loader          = new Loader();
    $.drawEngine      = new DrawEngine();
    $.ellipse         = new Ellipse();
    //$.rectangle       = new $.Rectangle();

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

  // return new Cyto(rendererType, canvasId);
};
