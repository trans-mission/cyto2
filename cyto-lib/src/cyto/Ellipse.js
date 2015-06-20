(function(CYTO) {

  /**
   * Creates an Ellipse object
   *
   * @constructor Ellipse
   *
   */

  var Ellipse = function(opt) {

    var $ = this;

    $._rootAccessible = false;

    // set constructor opt
    $.drawCenter  = (opt && opt.drawCenter)  ? opt.drawCenter  : false;
    $.strokeStyle = (opt && opt.strokeStyle) ? opt.strokeStyle : '#fff';
    $.fillStyle   = (opt && opt.fillStyle)   ? opt.fillStyle   : '#000';
    $.draggable   = (opt && opt.draggable)   ? true            : false;

    //TODO: support storing coords

    $.hasFill   = (opt && opt.fillStyle);
    $.hasStroke = true;

    // $.x1 = (opt && opt.x1) ? opt.x1 : 0;
    // $.y1 = (opt && opt.y1) ? opt.y1 : 0;
    // $.x2 = (opt && opt.x2) ? opt.x2 : 0;
    // $.y2 = (opt && opt.y2) ? opt.y2 : 0;
    // $.x3 = (opt && opt.x3) ? opt.x3 : 0;
    // $.y3 = (opt && opt.y3) ? opt.y3 : 0;

    //public methods reserved for instantiated class objects
    $.draw = $._draw;
  };

  /* public methods
     -------------------------------------------------- */
  /**
  * Draws an ellipse
  *
  * @param {Number} x1 x-coord of first point

  */

  Ellipse.prototype.ellipse = function () {

    var $ = this;

    // $.renderer.beginPath();
    // $.renderer.moveTo(x1, y1);
    // $.renderer.lineTo(x2, y2);
    // $.renderer.lineTo(x3, y3);
    // $.renderer.closePath();
    // $.renderer.stroke();
    // $.renderer.fill();
    // $.renderer.clearPath();
  };

  /**
  * Draws an arc
  *
  * @param {Number} x x-coord of first point
  * @param {Number} y y-coord of first point
  * @param {Number} startAngle angle to start drawing from
  * @param {Number} CCW - if true, arc is counterclockwise
  */

  Ellipse.prototype.arc = function(x, y, radius, startAngle, endAngle, CCW) {

    var $ = this;

    $.renderer.beginPath();
    $.renderer._context.arc(x, y, radius, startAngle, endAngle, CCW);
    $.renderer.stroke();
    $.renderer.fill();
    $.renderer.clearPath();
  };

  /* private functions
     -------------------------------------------------- */

  Ellipse.prototype._draw = function() {

    var $ = this;

    //injects local style then restores the renderer
    if($ instanceof Triangle) {
      $.renderer.save();

      if($.hasStroke) {
        $.renderer.stroke($.strokeStyle);
      } else {
        $.renderer.noStroke();
      }

      if($.hasFill) {
        $.renderer.fill($.fillStyle);
      } else {
        $.renderer.noFill();
      }

      $.triangle($.x1, $.y1, $.x2, $.y2, $.x3, $.y3);
      $.renderer.restore();
    }
  };

  CYTO.Ellipse = Ellipse;

})(CYTO);


// var Ellipse = function() {
//
//   var $ = this;
//
//   $.rootAccessible = true;
//   $._context = cyto.renderer.getContext();



//
// define(['/cyShape.js', '/cyUtils.js'], function (Shape, utils) {
//
//   /**
//    * Creates an Ellipse object
//    *
//    * @constructor Ellipse
//    *
//    * @param options   {Object}  - configuration options for ellipse object
//    * @param options.x {Number}  - center x coordinate of the ellipse
//    * @param options.y {Number}  - center y coordinate of the ellipse
//    * @param options.w {Number}  - width of the ellipse
//    * @param options.h {Number}  - height of the ellipse
//    */
//
//   var cyEllipse = function(options) {
//
//     this.root = utils.getRootInstance();
//
//     if(!this.root) return this; //evade constructor if root not instantiated
//
//     // set constructor options
//
//     this.drawCenter  = (options && options.drawCenter)  ? options.drawCenter  : false;
//     this.radius      = (options && options.radius)      ? options.radius      : 0;
//     this.strokeStyle = (options && options.strokeStyle) ? options.strokeStyle : '#fff';
//     this.fillStyle   = (options && options.fillStyle)   ? options.fillStyle   : '#000';
//     this.draggable   = (options && options.draggable)   ? true                : false;
//
//     //private properties
//
//     this._width      = (options && options.width)      ? options.width      : 100;
//     this._height     = (options && options.height)     ? options.height     : 100;
//
//     this._x = (options && options.x) ? (this.drawCenter) ?
//               options.x - this._width / 2 : options.x :
//               (this.drawCenter) ? - this._width/2 : 0;
//
//     this._y = (options && options.y) ? (this.drawCenter) ?
//               options.y - this._height / 2 : options.y :
//               (this.drawCenter) ? - this._height/2 : 0;
//
//     this._hasFill    = (options && options.fillStyle);
//     this._hasStroke  = true;
//
//     this.top    = this._y;
//     this.bottom = this._y + this._height;
//     this.left   = this._x;
//     this.right  = this._x + this._width;
//
//     //public methods reserved for instantiated class objects
//     this.draw = this._draw;
//
//     //links 'this' to canvas 2D drawing api
//     this._bindToView();
//
//     this._registerEvents();
//   };
//
//   var p = cyEllipse.prototype = new Shape();
//
//   p.ellipse = function (x, y, w, h) {
//
//     if(this.drawCenter) {
//       x = x - w / 2.0;
//       y = y - h / 2.0;
//     }
//
//     var kappa = .5522848
//       , ox = (w / 2) * kappa // control point offset horizontal
//       , oy = (h / 2) * kappa // control point offset vertical
//       , xe = x + w           // x-end
//       , ye = y + h           // y-end
//       , xm = x + w / 2       // x-middle
//       , ym = y + h / 2       // y-middle
//       ;
//
//     this.beginPath();
//
//     this.moveTo(x, ym);
//     this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
//     this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
//     this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
//     this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
//
//     this.stroke();
//     this.fill();
//
//     this.clearPath();
//   };
//
//   /* private functions
//      -------------------------------------------------- */
//
//   p._draw = function() {
//     if(!this._hasBeenDrawn) this._hasBeenDrawn = true;
//     if(this instanceof cyEllipse) {
//       this.save();
//       if(this._hasStroke) {
//         this.stroke(this.strokeStyle);
//       } else {
//         this.noStroke();
//       }
//       if(this._hasFill) {
//         this.fill(this.fillStyle);
//       } else {
//         this.noFill();
//       }
//       this.ellipse(this.x, this.y, this.width, this.height);
//       this.restore();
//     }
//   };
//
//   return cyEllipse;
// });
