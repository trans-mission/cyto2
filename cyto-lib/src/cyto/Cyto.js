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

    cyto.eventDispatcher = new EventDispatcher();
    cyto.view            = new View();
    cyto.errors          = new ErrorMessages();
    cyto.renderer        = new Renderer();
    cyto.loader          = new Loader();
    cyto.drawEngine      = new DrawEngine();
    cyto.ellipse         = new Ellipse();

    makeRootAccessible(cyto);

    //load sketch
    cyto.loader.loadSketch(cyto.path + cyto.sketch, init.bind(this));

    //initialize sketch
    function init() {

      //maximize canvas view
      cyto.width   = window.innerWidth;
      cyto.height  = window.innerHeight;

      cyto.drawEngine.start(cyto.canvas);
    }

    function makeRootAccessible(target) {
      var p;
      for(var obj in target) {
        if(typeof(target[obj]) === 'object' && target[obj]._rootAccessible) {
          // apply instance methods & properties onto the root
          for(var key in target[obj]) {
            if(target[obj].hasOwnProperty(key) && !String(key).match(/_/)) {
              if(typeof(target[obj][key]) === 'function') {
                target[key] = target[obj][key].bind(target[obj]);
              } else {

                /*
                *  get or set subclass property from root
                *
                * important to bind target[obj] and pass key arg
                * within anonymous function; else we would only have
                * access to the last target[obj] in the for loop iteration
                * also, javascript passes value by copy-ref, so we
                * cannot simply say root[key] = root[object][key]
                * and have values stay in sync
                */

                (function(key) {
                  var subclass = this;

                  Object.defineProperty(target, key, {
                    get: function() {
                      return subclass[key];
                    },
                    set: function(value) {
                      subclass[key] = value;
                    },
                    enumerable: true
                  });

                }.bind(target[obj]))(key);

              }
              //target[key] = target[o][key];
            }
          }
          //  apply the prototype properties and methods onto the root
          p = Object.getPrototypeOf(target[obj]);
          for(var key in p) {
            if(p.hasOwnProperty(key) && !String(key).match(/_/)) {
              if(typeof(p[key]) === 'function') {
                target[key] = p[key].bind(target[obj]);
              } else {
                target[key] = p[key];
              }
            }
          }
        }
      }
    };

  };

  return new Cyto(rendererType, canvasId);
};
