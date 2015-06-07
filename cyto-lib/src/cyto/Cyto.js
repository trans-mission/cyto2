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

    cyto.errors          = new ErrorMessages();
    cyto.renderer        = new Renderer();
    cyto.eventDispatcher = new EventDispatcher();
    cyto.loader          = new Loader(cyto);
    cyto.drawEngine      = new DrawEngine(cyto);
    cyto.ellipse         = new Ellipse();

    makeRootAccessible(cyto);

    //load sketch
    cyto.loader.loadSketch(cyto.path + cyto.sketch, init.bind(this));

    //initialize sketch
    function init() {

      //maximize canvas view
      cyto.width   = window.innerWidth;
      cyto.height  = window.innerHeight;
      cyto.centerX = cyto.width/2;
      cyto.centerY = cyto.height/2;

      cyto.drawEngine.start(cyto.canvas);
    }

    function captureEvents(object, events) {
      events.forEach(function(e) {
        if(!cyto._eventsList[object]) cyto._eventsList[object] = [];
        cyto._eventsList[object].push(e);
      });
    }

    function hasEvents(object) {
      return (object.events !== undefined);
    }

    function makeRootAccessible() {
      for(var o in cyto) {
        if(typeof(cyto[o]) === 'object' && cyto[o]._rootAccessible) {
          // apply instance methods & properties onto the root
          for(var key in cyto[o]) {
            if(cyto[o].hasOwnProperty(key) && !String(key).match(/_/)) {
              if(typeof(cyto[o][key]) === 'function') {
                cyto[key] = cyto[o][key].bind(cyto[o]);
              } else {
                cyto[key] = cyto[o][key];
              }
              //place reference onto the root
              //cyto[key] = cyto[o][key];
            }
          }
          //  apply the prototype properties and methods onto the root
          var p = Object.getPrototypeOf(cyto[o]);

            //TODO: capture events for subclass (is cyto even necessary???)
            // if(cyto._hasEvents(proto)) {
            //   cyto._captureEvents(object, proto.events);
            // }
          for(var key in p) {
            if(p.hasOwnProperty(key) && !String(key).match(/_/)) {
              if(typeof(p[key]) === 'function') {
                cyto[key] = p[key].bind(cyto[o]);
              } else {
                cyto[key] = p[key];
              }
            }
          }
        }
      }
    };

  };

  return new Cyto(rendererType, canvasId);
};
