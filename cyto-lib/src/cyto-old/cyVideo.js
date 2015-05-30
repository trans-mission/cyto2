define(function () {

  var _this;

  //private members
  var _offscreenCanvas = {}
    , _imageData;

   /* VIDEO CLASS
   --------------------------------------------------- */

  var Video = function(path) {
    _this = this;
    _this.root = cyto;

    _this.videoElement = {};
    _this.context = cyto.canvas.context2D;
    _this.x;
    _this.y;

    if(path) this.load(path);
  };

  /* CANVAS PROTOTYPE
   --------------------------------------------------- */

  Video.prototype = {

    /**
     *
     * Draws video to the canvas
     *
     * @method Draw
     * @param x {Number} The x coordinate of the video
     * @param y {Number} The y coordinate of the video
     *
     */

    draw: function (x, y) {
      _this.root.drawImage(this.videoElement, x, y);
    },

    getImageData: function() {
      var c = _offscreenCanvas;
      
      return c.getImageData(0, 0, c.width, c.height);
    },

    /**
     *
     * loads a list of webm videos
     *
     * @method load
     * @param src {String} A path to a webm video file
     *
     */

    load: function (src) {

      var v = this.videoElement = document.createElement('video');

      v.setAttribute('src',   src);

      v.setAttribute('type',     'video/webm'); //webm only
      v.setAttribute('autoplay', 'autoplay'); //currently autoplays

      //browser should load the entire video when the page loads
      v.setAttribute('preload', 'auto');

      //TODO: provide class width & height config
      v.setAttribute('width',    800); //TMP
      v.setAttribute('height',   480); //TMP

      v.style.display = 'none';
      
      v.addEventListener('loadeddata', function() {
        // loaded and can now be played
        v.addEventListener('ended', function() {
          v.currentTime = 1.0;
          v.play();
        });
      }, false);

      document.body.appendChild(v);

      makeOffScreenCanvas(v.width, v.height);

      //TODO: ability to pass properties along with a handler
      cyto.engine.addEventListener('update', _updateImageData.bind(this));
    }

  };

   /* PRIVATE FUNCTIONS
   --------------------------------------------------- */

  var getTimeNow = function () {
    return + new Date;
  };

  var _updateImageData = function () {
    var width  = this.videoElement.width
      , height = this.videoElement.height;

      _offscreenCanvas.context2D.drawImage(this.videoElement, 0, 0);

    //console.log(this.videoElement.width);
 //      drawImage(this.video, 0, 0);
 //      _offscreenCanvas.getImageData(0,0)

 // imageData = offscreenContext.getImageData(0, 0,
 //                  offscreenCanvas.width, offscreenCanvas.height);
  }

  function makeOffScreenCanvas(videoWidth, videoHeight) {
    var _canvas = document.createElement('canvas');

    _offscreenCanvas = {
      context2D : _canvas.getContext('2d'),
      width     : videoWidth,
      height    : videoHeight
    };
  }
  
  return Video;
  //return new Video();
});