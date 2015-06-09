"use strict"

/**
* Cyto Library Class
* @class Cyto
*/

//wrapper to kick off library
var cyto = function(rendererType, canvasId) {

  var Cyto = function(rendererType, canvasId) {

    cyto = this; //global cyto object (overwrites init cyto function)

    cyto.rendererType  = rendererType;

    cyto.canvas = document.getElementById(canvasId);
    cyto.sketch = cyto.canvas.getAttribute('data-sketch');
    cyto.path   = '/sketches/'

    //initialize all subclasses
    cyto.utils           = new Utils();
    cyto.eventDispatcher = new EventDispatcher();
    cyto.view            = new View();
    cyto.errors          = new ErrorMessages();
    cyto.renderer        = new Renderer();
    cyto.loader          = new Loader();
    cyto.drawEngine      = new DrawEngine();
    cyto.ellipse         = new Ellipse();

    //put root accesible props on cyto object (global access)
    cyto.utils.accessRootProps(cyto);

    //load sketch
    cyto.loader.loadSketch(cyto.path + cyto.sketch, init.bind(this));

    //initialize sketch
    function init() {

      //maximize canvas view
      cyto.reset();

      //start drawing engine
      cyto.start();
    }
  };

  return new Cyto(rendererType, canvasId);
};
