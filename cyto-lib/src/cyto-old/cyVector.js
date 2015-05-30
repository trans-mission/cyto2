define(['/cyConstants.js'], function (CONSTANTS) {


  var cyVector = function(x, y, z) {
    _this = this;
    _this.x = x || 0;
    _this.y = y || 0;
  };

  cyVector.fromAngle = function(angle, v) {
      if (v === undef || v === null) {
        v = new cyVector();
      }
      v.x = Math.cos(angle);
      v.y = Math.sin(angle);
      return v;
    };
   
  cyVector.random2D = function(v) {
    return Vector.fromAngle(Math.random() * CONSTANTS.TWO_PI, v);
  };
 
  cyVector.dist = function(v1, v2) {
    return v1.dist(v2);
  };
 
  cyVector.dot = function(v1, v2) {
    return v1.dot(v2);
  };
 
  cyVector.cross = function(v1, v2) {
    return v1.cross(v2);
  };
 
  cyVector.sub = function(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  };
 
  cyVector.angleBetween = function(v1, v2) {
    return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
  };
 
  cyVector.lerp = function(v1, v2, amt) {
    // non-static lerp mutates object, but this version returns a new vector
    var retval = new Vector(v1.x, v1.y, v1.z);
    retval.lerp(v2, amt);
    return retval;
  };
 
  cyVector.prototype = {
    set: function(v, y, z) {
      if (arguments.length === 1) {
        this.set(v.x || v[0] || 0,
                 v.y || v[1] || 0,
                 v.z || v[2] || 0);
      } else {
        this.x = v;
        this.y = y;
        this.z = z;
      }
    },
    get: function() {
      return new Vector(this.x, this.y, this.z);
    },
    mag: function() {
      var x = this.x,
          y = this.y,
          z = this.z;
      return Math.sqrt(x * x + y * y + z * z);
    },
    magSq: function() {
      var x = this.x,
          y = this.y,
          z = this.z;
      return (x * x + y * y + z * z);
    },
    setMag: function(v_or_len, len) {
      if (len === undef) {
        len = v_or_len;
        this.normalize();
        this.mult(len);
      } else {
        var v = v_or_len;
        v.normalize();
        v.mult(len);
        return v;
      }
    },
    add: function(v, y, z) {
      if (arguments.length === 1) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
      } else {
        this.x += v;
        this.y += y;
        this.z += z;
      }
    },
    sub: function(v, y, z) {
      if (arguments.length === 1) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
      } else {
        this.x -= v;
        this.y -= y;
        this.z -= z;
      }
    },
    mult: function(v) {
      if (typeof v === 'number') {
        this.x *= v;
        this.y *= v;
        this.z *= v;
      } else {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
      }
    },
    div: function(v) {
      if (typeof v === 'number') {
        this.x /= v;
        this.y /= v;
        this.z /= v;
      } else {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
      }
    },
    rotate: function(angle) {
      var prev_x = this.x;
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      this.x = c * this.x - s * this.y;
      this.y = s * prev_x + c * this.y;
    },
    dist: function(v) {
      var dx = this.x - v.x,
          dy = this.y - v.y,
          dz = this.z - v.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    dot: function(v, y, z) {
      if (arguments.length === 1) {
        return (this.x * v.x + this.y * v.y + this.z * v.z);
      }
      return (this.x * v + this.y * y + this.z * z);
    },
    cross: function(v) {
      var x = this.x,
          y = this.y,
          z = this.z;
      return new Vector(y * v.z - v.y * z,
                         z * v.x - v.z * x,
                         x * v.y - v.x * y);
    },
    lerp: function(v_or_x, amt_or_y, z, amt) {
      var lerp_val = function(start, stop, amt) {
        return start + (stop - start) * amt;
      };
      var x, y;
      if (arguments.length === 2) {
        // given vector and amt
        amt = amt_or_y;
        x = v_or_x.x;
        y = v_or_x.y;
        z = v_or_x.z;
      } else {
        // given x, y, z and amt
        x = v_or_x;
        y = amt_or_y;
      }
      this.x = lerp_val(this.x, x, amt);
      this.y = lerp_val(this.y, y, amt);
      this.z = lerp_val(this.z, z, amt);
    },
    normalize: function() {
      var m = this.mag();
      if (m > 0) {
        this.div(m);
      }
    },
    limit: function(high) {
      if (this.mag() > high) {
        this.normalize();
        this.mult(high);
      }
    },
    heading: function() {
      return (-Math.atan2(-this.y, this.x));
    },
    heading2D: function() {
      return this.heading();
    },
    toString: function() {
      return "[" + this.x + ", " + this.y + ", " + this.z + "]";
    },
    array: function() {
      return [this.x, this.y, this.z];
    }
  };
 
  function createVectorMethod(method) {
    return function(v1, v2) {
      var v = v1.get();
      v[method](v2);
      return v;
    };
  }
 
  for (var method in cyVector.prototype) {
    if (cyVector.prototype.hasOwnProperty(method) && !cyVector.hasOwnProperty(method)) {
      cyVector[method] = createVectorMethod(method);
    }
  }
 
  return cyVector;

});