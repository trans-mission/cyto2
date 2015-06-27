(function(CYTO) {

  /**
   * Creates an Point object
   *
   * @constructor Point
   *
   * @param opt   {Object}  - configuration opt for ellipse object
   * @param opt.x {Number}  - center x coordinate of the ellipse
   * @param opt.y {Number}  - center y coordinate of the ellipse
   * @param opt.w {Number}  - w of the ellipse
   * @param opt.h {Number}  - h of the ellipse
   */

  var Point = function(opt) {

    var $ = this;

    $._rootAccessible = false;

    var type = typeof arg0;
    if (type === 'number') {
      var hasY = typeof arg1 === 'number';
      this.x = arg0;
      this.y = hasY ? arg1 : arg0;
      if (this.__read)
        this.__read = hasY ? 2 : 1;
    } else if (type === 'undefined' || arg0 === null) {
      this.x = this.y = 0;
      if (this.__read)
        this.__read = arg0 === null ? 1 : 0;
    } else {
      if (Array.isArray(arg0)) {
        this.x = arg0[0];
        this.y = arg0.length > 1 ? arg0[1] : arg0[0];
      } else if (arg0.x != null) {
        this.x = arg0.x;
        this.y = arg0.y;
      } else if (arg0.width != null) {
        this.x = arg0.width;
        this.y = arg0.height;
      } else if (arg0.angle != null) {
        this.x = arg0.length;
        this.y = 0;
        this.setAngle(arg0.angle);
      } else {
        this.x = this.y = 0;
        if (this.__read)
          this.__read = 0;
      }
      if (this.__read)
        this.__read = 1;
    }

    // $.renderer = cyto.renderer;
    //
    // // set constructor opt
    // $.drawCenter  = (opt && opt.drawCenter)  ? opt.drawCenter  : false;
    // $.radius      = (opt && opt.radius)      ? opt.radius      : 0;
    // $.strokeStyle = (opt && opt.strokeStyle) ? opt.strokeStyle : '#fff';
    // $.fillStyle   = (opt && opt.fillStyle)   ? opt.fillStyle   : '#000';
    // $.draggable   = (opt && opt.draggable)   ? true            : false;
    //
    // //private properties
    // $.w = (opt && opt.w) ? opt.w : 100;
    // $.h = (opt && opt.h) ? opt.h : 100;
    //
    // $.x = (opt && opt.x) ? ($.drawCenter) ?
    //       (opt.x - $.w) / 2 : opt.x : ($.drawCenter) ? - $.w/2 : 0;
    //
    // $.y = (opt && opt.y) ? ($.drawCenter) ?
    //       (opt.y - $.h) / 2 : opt.y : ($.drawCenter) ? - $.h/2 : 0;
    //
    // $.hasFill   = (opt && opt.fillStyle);
    // $.hasStroke = true;
    //
    // $.top    = $.y;
    // $.bottom = $.y + $.h;
    // $.left   = $.x;
    // $.right  = $.x + $.w;

    //public methods reserved for instantiated class objects
    $.draw = $._draw;
  };

  /* public methods
     -------------------------------------------------- */

 /**
  * Set the x and y coordinate for the point
  *
  * @method set
  * @param {Number} x - A new x coordinate
  * @param {Number} y - A new y coordinate
  */

  Point.prototype.set = function () {

   this.x = x;
   this.y = y;
  };

 /**
  * Checks whether the coordinates of the points are equal
  *  to that of the supplied point.
  *
  * @method equals
  * @param {Point} point - The x coordinate
  * @returns {Boolean} true if the points are equal, false otherwise
  */

  Point.prototype.equals = function () {

    return this === point || point
      && (this.x === point.x && this.y === point.y
      || Array.isArray(point)
      && this.x === point[0] && this.y === point[1])
      || false;
  };

  Point.prototype.clone = function () {
    return new cyPoint(this.x, this.y);
  };

  Point.prototype.getDistance = function () {
    var point = cyPoint.read(arguments),
      x = point.x - this.x,
      y = point.y - this.y,
      d = x * x + y * y,
      squared = Base.read(arguments);
    return squared ? d : Math.sqrt(d);
  };

  Point.prototype.add = function () {
    var point = cyPoint.read(arguments);
    return new cyPoint(this.x + point.x, this.y + point.y);
  };

  Point.prototype.subtract = function () {
    var point = cyPoint.read(arguments);
    return new cyPoint(this.x - point.x, this.y - point.y);
  };

  Point.prototype.multiply = function () {
    var point = cyPoint.read(arguments);
    return new cyPoint(this.x * point.x, this.y * point.y);
  };

  Point.prototype.divide = function () {
    var point = cyPoint.read(arguments);
    return new cyPoint(this.x / point.x, this.y / point.y);
  };

  Point.prototype.modulo = function () {
    var point = cyPoint.read(arguments);
    return new cyPoint(this.x % point.x, this.y % point.y);
  };

  Point.prototype.isClose = function () {
    return this.getDistance(point) < tolerance;
  };

  /* private functions
     -------------------------------------------------- */

  Point.prototype._draw = function() {
    var $ = this;

    //injects local style then restores the renderer

    if(!$.hasBeenDrawn) $._hasBeenDrawn = true;

    if($ instanceof Point) {
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
      $.rect($.x, $.y, $.w, $.h, $.radius);
      $.renderer.restore();
    }
  };

  CYTO.Point = Point;

})(CYTO);
