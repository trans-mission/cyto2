/**
* Provides the primary Renderer class
* @module cyto library object
*/

//wrapper to kick off library
var cyto = function(rendererType, canvasId) {

  var Cyto = function(rendererType, canvasId) {

    cyto = this; //global cyto object (overwrites init cyto function)

    var loader = new Loader()
      , canvas = document.getElementById(canvasId)
      , sketch = canvas.getAttribute('data-sketch')
      , path   = '/sketches/' + sketch + '.js'
      , type = (
          rendererType == 'canvas' ||
          rendererType == 'webgl') ?
          rendererType :
          false
      ;

    if(!type) {
      console.error('Cyto error: No renderer "' + rendererType +
      '". Only canvas and webgl are supported!');
    } else {

      cyto.renderer = new Renderer(type, canvas);
      cyto.eventDispatcher = new EventDispatcher(cyto);
      cyto.drawEngine = new DrawEngine(cyto);

      this._gatherRootObjects(this);

      loader.loadSketch(path, function(data) {
        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.innerHTML = data;

        document.body.appendChild(script);
        cyto.drawEngine.start(canvas);
      });
    }
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

  Cyto.prototype._gatherRootObjects = function () {
    var proto;

    for(var object in this) {
      if(typeof(this[object]) === 'object') {

        console.log(this[object]);
        proto = Object.getPrototypeOf(this[object]);

        if(this._hasEvents(proto)) {
          this._captureEvents(object, proto.events);
        }
        for(var key in proto) {
          if(proto.hasOwnProperty(key) && !String(key).match(/_/)) { //if not private
            if(typeof proto[key] === 'function') {
              this[key] = function() { //wraps function calls of exposed prototype methods
                proto[key]();
              }
            } else {
              this[key] = proto[key];
            }
          }
        }
      }
    }
  };

  return new Cyto(rendererType, canvasId);

};
