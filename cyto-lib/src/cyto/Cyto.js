"use strict"

/**
* Cyto Library Class
* @class Cyto
*/

//wrapper to kick off library
var cyto = function(rendererType, canvasId) {

  var Cyto = function(rendererType, canvasId) {

    cyto = this; //global cyto object (overwrites init cyto function)

    this.rendererType  = rendererType
    this.canvas = document.getElementById(canvasId);
    this.sketch = this.canvas.getAttribute('data-sketch');
    this.path   = '/sketches/'

    this.errors          = new ErrorMessages(this);
    this.renderer        = new Renderer(this);
    this.eventDispatcher = new EventDispatcher(this);
    this.loader          = new Loader(this);
    this.drawEngine      = new DrawEngine(this);
    this.ellipse         = new Ellipse();


    this._gatherRootProperties(this);

    //load sketch
    this.loader.loadSketch(this.path + this.sketch, start.bind(this));

    //initialize sketch
    function start() {
      //   this.width   = window.innerWidth;
      //   this.height  = window.innerHeight;
      //   this.centerX = this.width/2;
      //   this.centerY = this.height/2;
      console.log(this.canvas.width, this.canvas.style.width);
      //this.drawEngine.start(this.canvas);
    }

  };

  Cyto.prototype._initializeView = function (targetCanvasElement) {
     _canvas.setAttribute('id', 'cyto-' + targetCanvasElement.id);

    _canvas.setAttribute('width',  targetCanvasElement.width);
    _canvas.setAttribute('height', targetCanvasElement.height);

    // TODO: don't think we need to replace elements here any longer
    // refactor for multiple canvas use
    targetCanvasElement.parentNode.replaceChild(_canvas, targetCanvasElement);

    this.width  = _canvas.width;
    this.height = _canvas.height;
  };

  Cyto.prototype._captureEvents = function (object, events) {
    events.forEach(function(e) {
      if(!this._eventsList[object]) this._eventsList[object] = [];
      this._eventsList[object].push(e);
    }.bind(this));
  };

  Cyto.prototype._hasEvents = function(object) {
    return (object.events !== undefined);
  };

  Cyto.prototype._gatherRootProperties = function () {

    for(var object in this) {
      if(typeof(this[object]) === 'object') {
        if(this[object]._rootAccessible) {

          // apply unique instance methods & properties onto the root
          for(var key in this[object]) {
            if(this[object].hasOwnProperty(key)) {

              //place reference onto the root
              this[key] = this[object][key];
            }
          }

          //  apply the prototype properties and methods onto the root
          var prototype = Object.getPrototypeOf(this[object]);

          //TODO: capture events for subclass (is this even necessary???)
          // if(this._hasEvents(prototype)) {
          //   this._captureEvents(object, prototype.events);
          // }
          for(var key in prototype) {
            if(prototype.hasOwnProperty(key) && !String(key).match(/_/)) {

              //place reference on root object
              this[key] = prototype[key];
            }
          }
        }
      }
    }
  };

  return new Cyto(rendererType, canvasId);
};
