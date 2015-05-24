define(['/cyShape.js', '/cyUtils.js'], function (Shape, utils) {

  /**
   * Creates an Rectangle object
   *
   * @constructor Ellipse
   * 
   * @param options        {Object}  - configuration options for ellipse object
   * @param options.x      {Number}  - center x coordinate of the ellipse
   * @param options.y      {Number}  - center y coordinate of the ellipse
   * @param options.width  {Number}  - width of the ellipse
   * @param options.height {Number}  - height of the ellipse
   */

  var cyRectangle = function(options) {

    this.root = utils.getRootInstance();

    if(!this.root) return this; //evade constructor if root not instantiated

    // set constructor options
    this.drawCenter  = (options && options.drawCenter)  ? options.drawCenter  : false;
    this.radius      = (options && options.radius)      ? options.radius      : 0;
    this.strokeStyle = (options && options.strokeStyle) ? options.strokeStyle : '#fff';
    this.fillStyle   = (options && options.fillStyle)   ? options.fillStyle   : '#000';
    this.draggable   = (options && options.draggable)   ? true                : false;

    //private properties
    this._width  = (options && options.width)  ? options.width  : 100;
    this._height = (options && options.height) ? options.height : 100;

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
  };

  var p = cyRectangle.prototype = new Shape();

  /* public methods
     -------------------------------------------------- */
  /**
  * Draws a rectangle using the current state of the canvas. 
  * By providing a fifth r argument a corner radius can be specified
  *
  * @param {CanvasRenderingContext2D} ctx
  * @param {Number} x The top left x coordinate
  * @param {Number} y The top left y coordinate 
  * @param {Number} width The width of the rectangle 
  * @param {Number} height The height of the rectangle
  * @param r {Number} radius The corner radius. Defaults to 5;
  * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
  * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
  */

  p.rect = function (x, y, w, h, r) {
    r = r || 0;

    if(this.drawCenter) {
      x = x - w / 2.0;
      y = y - h / 2.0;
    }

    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();

    this.stroke();
    this.fill();
    this.clearPath();
  };

  /* private functions
     -------------------------------------------------- */

  p._draw = function() {
    if(!this._hasBeenDrawn) this._hasBeenDrawn = true;

    if(this instanceof cyRectangle) {
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
      this.rect(this.x, this.y, this.width, this.height, this.radius);
      this.restore();
    }
  };

  return cyRectangle;
});