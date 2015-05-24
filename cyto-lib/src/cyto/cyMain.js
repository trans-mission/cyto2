define([

  //Core Modules
  '/cyView.js',
  '/cyGrid.js',
  '/cyConstants.js',
  '/cyCoords.js',
  '/cyDrawEngine.js',
  '/cyShape.js',
  '/cyVideo.js',
  '/cyEventDispatcher.js',
  '/cyMouse.js',
  '/cyMath.js',
  '/cyPoint.js',
  '/cySketchLoader.js',
  '/cyUtils.js',
  '/cyVector.js',

  //2D Primitives
  '/cyEllipse.js',
  '/cyRectangle.js',
  '/cyPolygon.js',

  //Addons
  '/addons/cyLeap.js'

  ],

  function (

    //Core Classes
    cyView,
    cyGrid,
    cyConstants,
    cyCoords,
    cyDrawEngine,
    cyShape,
    cyVideo,
    cyEventDispatcher,
    cyMouse,
    cyMath,
    cyPoint,
    cySketchLoader,
    cyUtils,
    cyVector,

    //2D Primitives
    cyEllipse,
    cyRectangle,
    cyPolygon,

    //Addons
    cyLeap
    //TODO: cyFCB1010

    ) {

    Cyto = function (canvasObject) {

      // this._mouseX = 0;
      // this._mosueY = 0;
      // this._drawCenter = false;


      this.utils = cyUtils;
      this.view  = new cyView(this);

      this.eventDispatcher = new cyEventDispatcher (this);
      this.coords          = new cyCoords          (this);
      // this.shape           = new cyShape           (this);
      // this.math            = new cyMath            (this);
      this.engine          = new cyDrawEngine      (this);
      this.mouse           = new cyMouse           (this);

      this.sketchLoader = new cySketchLoader(this);

      //this._gatherRootObjects(this);
      //this._registerEvents();
      // this._registerGlobalEvents();

      //Constructor Singletons
      this.Grid      = cyGrid;
      this.Vector    = cyVector;
      this.Video     = cyVideo;
      this.Point     = cyPoint;
      this.Shape     = cyShape;
      this.Ellipse   = cyEllipse;
      this.Rectangle = cyRectangle;
      this.Polygon   = cyPolygon;

        //  //ADDON CONSTRUCTOR CLASSES
        // this.Leap = cyLeap;

        // this.refresh();

      //instantiate core objects


      //instantiate core 2d primitives

      //this.rectange = new cyRectangle();
      //this.ellipse  = new cyEllipse();

      this.const = cyConstants;

      cyConstants.ROOT_INSTANCE = this; //root reference


      //TODO: support multiple sketches on one page
      var cytoElements = document.querySelectorAll('.cyto')
        , sketch = cytoElements[0].getAttribute('data-sketch')
        , path = 'sketches/' + sketch + '.js'
        ;

      this.sketchLoader.loadSketch(path, function(e) {

        console.log('sketch was loaded');
        
        this._initializeView(cytoElements[0]);
        this.engine.start(cytoElements[0]);

      }.bind(this));


    };

    cyConstants.ROOT_CLASS   = Cyto; //root reference

    var p = Cyto.prototype = new cyView(); //uses a single canvas view for everything

    // Object.defineProperty(p, 'mouseX', {
    //   get: function()  { return this._mouseX },
    //   set: function(x) { this._mouseX = x;   }
    // });

    // Object.defineProperty(p, 'mouseY', {
    //   get: function()  { return this._mouseY },
    //   set: function(y) { this._mouseY = y;   }
    // });

    // Object.defineProperty(p, 'drawCenter', {
    //   get: function()     { return this._drawCenter; },
    //   set: function(bool) { this._drawCenter = bool; }
    // });

    // p.refresh = function() {
    //   this.width   = window.innerWidth;
    //   this.height  = window.innerHeight;
    //   this.centerX = this.width/2;
    //   this.centerY = this.height/2;
    // };

    // p.resize = function() {
    //   this.refresh();
    //   this.setup();
    // };

    // p._eventsList = {};

    // p._events = {};

    // p._getEventType = function(query) {
    //   var eventType;
    //   for(var type in this._eventsList) {
    //     this._eventsList[type].forEach(function(e) {
    //       if(eventType) return; //short circuit loop if found
    //       if(e === query) {
    //         eventType = type;
    //       }
    //     });
    //   }
    //   return eventType;
    // };

    //p._noop = function () { /* no operation */ return false };

    // p._registerEvents = function () {
    //   for(var type in this._eventsList) {
    //     this._eventsList[type].forEach(function(e) {
    //       p._events[e] = {};
    //       Object.defineProperty(p, e, {
    //         get: function() {
    //           return this._events[e];
    //         }.bind(this),
    //         set: function(handler) {
    //           this._events[e] = handler;
    //           this.on(this._events[e], handler);
    //         }.bind(this)
    //       });
    //       p[e] = p._noop;
    //     }.bind(this));
    //   }
    // };

    // p._registerGlobalEvents = function () {
    //   this.on('mouseDown', this._mouseDown);
    //   this.on('mouseUp'  , this._mouseUp);
    //   this.on('mouseMove', this._mouseMove);

    //   window.onmousemove = this.mouse._mouseMove.bind(this);
    //   window.onmousedown = this.mouse._mouseDown.bind(this);
    //   window.onmouseup   = this.mouse._mouseUp.bind(this);
    // };

    // p._mouseUp = function (e) {
    //   if(this.mouseUp) this.mouseUp(e);
    // };

    // p._mouseDown = function (e) {
    //   if(this.mouseDown) this.mouseDown(e);
    // };

    // p._mouseMove = function (e) {
    //   this.mouseX = e.x;
    //   this.mouseY = e.y;
    //   if(this.mouseMove) this.mouseMove(e);
    // };

    p._captureEvents = function (object, events) {
      events.forEach(function(e) {
        if(!this._eventsList[object]) this._eventsList[object] = [];
        this._eventsList[object].push(e);
      }.bind(this));
    };

    p._hasEvents = function(object) {
      return (object.events !== undefined);
    };

    p._gatherRootObjects = function () {
      var proto;

      for(var object in this) {
        if(typeof(this[object]) === 'object') {
          proto = Object.getPrototypeOf(this[object]);

          if(this._hasEvents(proto)) {
            this._captureEvents(object, proto.events);
          }
          for(var key in proto) {
            if(proto.hasOwnProperty(key) && !String(key).match(/_/)) { //if not private
              if(typeof proto[key] === 'function') {
                this[key] = proto[key];
              } else {
                this[key] = proto[key];
              }
            }
          }
        }
      }
    };

    return Cyto;
});
