define(['/cyShape.js', '/cyUtils.js'], function (Shape, utils) {

  /**
   * Creates an Ellipse object
   *
   * @constructor Ellipse
   * 
   * @param options   {Object}  - configuration options for ellipse object
   * @param options.x {Number}  - center x coordinate of the ellipse
   * @param options.y {Number}  - center y coordinate of the ellipse
   * @param options.w {Number}  - width of the ellipse
   * @param options.h {Number}  - height of the ellipse
   */

  var cyEllipse = function(options) {

    this.root = utils.getRootInstance();

    if(!this.root) return this; //evade constructor if root not instantiated

    // set constructor options

    this.drawCenter  = (options && options.drawCenter)  ? options.drawCenter  : false;
    this.radius      = (options && options.radius)      ? options.radius      : 0;
    this.strokeStyle = (options && options.strokeStyle) ? options.strokeStyle : '#fff';
    this.fillStyle   = (options && options.fillStyle)   ? options.fillStyle   : '#000';
    this.draggable   = (options && options.draggable)   ? true                : false;

    //private properties

    this._width      = (options && options.width)      ? options.width      : 100;
    this._height     = (options && options.height)     ? options.height     : 100;

    this._x = (options && options.x) ? (this.drawCenter) ?
              options.x - this._width / 2 : options.x : 
              (this.drawCenter) ? - this._width/2 : 0;

    this._y = (options && options.y) ? (this.drawCenter) ?
              options.y - this._height / 2 : options.y : 
              (this.drawCenter) ? - this._height/2 : 0;

    this._hasFill    = (options && options.fillStyle);
    this._hasStroke  = true;

    this.top    = this._y;
    this.bottom = this._y + this._height;
    this.left   = this._x;
    this.right  = this._x + this._width;

    //public methods reserved for instantiated class objects
    this.draw = this._draw;

    //links 'this' to canvas 2D drawing api
    this._bindToView();

    this._registerEvents();
  };

  var p = cyEllipse.prototype = new Shape();

  p.ellipse = function (x, y, w, h) {

    if(this.drawCenter) {
      x = x - w / 2.0;
      y = y - h / 2.0;
    }

    var kappa = .5522848
      , ox = (w / 2) * kappa // control point offset horizontal
      , oy = (h / 2) * kappa // control point offset vertical
      , xe = x + w           // x-end
      , ye = y + h           // y-end
      , xm = x + w / 2       // x-middle
      , ym = y + h / 2       // y-middle
      ;

    this.beginPath();

    this.moveTo(x, ym);
    this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

    this.stroke();
    this.fill();

    this.clearPath();
  };

  /* private functions
     -------------------------------------------------- */

  p._draw = function() {
    if(!this._hasBeenDrawn) this._hasBeenDrawn = true;
    if(this instanceof cyEllipse) {
      this.save();
      if(this._hasStroke) {
        this.stroke(this.strokeStyle);
      } else {
        this.noStroke();
      }
      if(this._hasFill) {
        this.fill(this.fillStyle);
      } else {
        this.noFill();
      }
      this.ellipse(this.x, this.y, this.width, this.height);
      this.restore();
    }
  };

  return cyEllipse;
});