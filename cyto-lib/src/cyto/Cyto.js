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
    this.renderer        = new Renderer(rendererType, canvas);
    this.eventDispatcher = new EventDispatcher(this);
    this.loader          = new Loader(this);
    this.drawEngine      = new DrawEngine(this);
    this.ellipse         = new Ellipse();

    // TODO: inspect apply method as means of gathering root objects
    // SEE: eventDispatcher
    
    // expose public methods from all library prototypes
    //this._getPrototypeMethods();


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

  Cyto.prototype._getPrototypeMethods = function () {
    var proto;

    var count = 1;

    console.log(this);
    for(var object in this) {
      if(typeof(this[object]) === 'object') {
        console.log(count++);

        return;
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
