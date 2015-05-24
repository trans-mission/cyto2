/**
 * @class:  cyPoint
 * @author: Mikhail Mansion
 */

define(function() {

  /**
  * Point Constructor
  *
  * @class cyPoint
  * @constructor
  */

  var cyPoint = function(arg0, arg1) {
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
  };

  cyPoint.prototype = {

  /**
   * Set the x and y coordinate for the point
   *
   * @method set
   * @param {Number} x - A new x coordinate
   * @param {Number} y - A new y coordinate
   */

    set: function(x, y) {
      this.x = x;
      this.y = y;
    },

  /**
   * Checks whether the coordinates of the points are equal 
   *  to that of the supplied point.
   *
   * @method equals
   * @param {Point} point - The x coordinate
   * @returns {Boolean} true if the points are equal, false otherwise
   */

    equals: function(point) {
    return this === point || point
        && (this.x === point.x && this.y === point.y
          || Array.isArray(point)
            && this.x === point[0] && this.y === point[1])
        || false;
    },

    clone: function() {
      return new cyPoint(this.x, this.y);
    },

    getDistance: function(/* point, squared */) {
      var point = cyPoint.read(arguments),
        x = point.x - this.x,
        y = point.y - this.y,
        d = x * x + y * y,
        squared = Base.read(arguments);
      return squared ? d : Math.sqrt(d);
    },

    add: function(/* point */) {
      var point = cyPoint.read(arguments);
      return new cyPoint(this.x + point.x, this.y + point.y);
    },

    subtract: function(/* point */) {
      var point = cyPoint.read(arguments);
      return new cyPoint(this.x - point.x, this.y - point.y);
    },

    multiply: function(/* point */) {
      var point = cyPoint.read(arguments);
      return new cyPoint(this.x * point.x, this.y * point.y);
    },

    divide: function(/* point */) {
      var point = cyPoint.read(arguments);
      return new cyPoint(this.x / point.x, this.y / point.y);
    },

    modulo: function(/* point */) {
      var point = cyPoint.read(arguments);
      return new cyPoint(this.x % point.x, this.y % point.y);
    },

    isClose: function(point, tolerance) {
      return this.getDistance(point) < tolerance;
    }
  };

  return cyPoint;

});