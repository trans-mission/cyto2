"use strict"

/**
* Provides the primary Renderer class
* @module cyto library object
*/

//wrapper to kick off library
var cyto = function(rendererType, canvasId) {

  var Cyto = function(rendererType, canvasId) {

    cyto = this; //global cyto object (overwrites init cyto function)

    var canvas = document.getElementById(canvasId)
      , sketch = canvas.getAttribute('data-sketch')
      , path   = '/sketches/' + sketch + '.js'
      ;
    

    // instantiate library classes
    this.errors          = new ErrorMessages(this);
    this.renderer        = new Renderer(this,rendererType, canvas);
    this.eventDispatcher = new EventDispatcher(this);
    this.loader          = new Loader(this);
    this.drawEngine      = new DrawEngine(this);
    this.ellipse         = new Ellipse();


    this._gatherRootProperties(this);

    //initialize sketch
    this.loader.loadSketch(path, function() {
      cyto.drawEngine.start(canvas);
    });

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
