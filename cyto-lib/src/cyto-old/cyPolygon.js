define(['/cyShape.js', '/cyPoint.js'], function(Shape, Point) {

  var cyPolygon = function() {

    this.points = [];
    this.strokeStyle = 'blue';
    this.fillStyle = 'white';
  };

  var p = cyPolygon.prototype = new Shape();

  p.getAxes = function () {
    var v1 = new Vector(),
       v2 = new Vector(),
       axes = [];
      
    for (var i=0; i < this.points.length-1; i++) {
      v1.x = this.points[i].x;
      v1.y = this.points[i].y;

      v2.x = this.points[i+1].x;
      v2.y = this.points[i+1].y;

      axes.push(v1.edge(v2).normal());
    }

    v1.x = this.points[this.points.length-1].x;
    v1.y = this.points[this.points.length-1].y;

    v2.x = this.points[0].x;
    v2.y = this.points[0].y;

    axes.push(v1.edge(v2).normal());

    return axes;
  };

  p.project = function (axis) {
     var scalars = [],
         v = new Vector();

     this.points.forEach( function (point) {
        v.x = point.x;
        v.y = point.y;
        scalars.push(v.dotProduct(axis));
     });

     return new Projection(Math.min.apply(Math, scalars),
                           Math.max.apply(Math, scalars));
  };

  p.addPoint = function (x, y) {
     this.points.push(new Point(x,y));
  };

  p.createPath = function (context) {
     if (this.points.length === 0)
        return;
        
     context.beginPath();
     context.moveTo(this.points[0].x,
                    this.points[0].y);
           
     for (var i=0; i < this.points.length; ++i) {
        context.lineTo(this.points[i].x,
                       this.points[i].y);
     }

     context.closePath();
  };
     
  p.move = function (dx, dy) {
     var point, x;
     for(var i=0; i < this.points.length; ++i) {
        point = this.points[i];
        point.x += dx;
        point.y += dy;
     }
  };

  p.move = function (dx, dy) {
     for (var i=0, point; i < this.points.length; ++i) {
        point = this.points[i];
        point.x += dx;
        point.y += dy;
     }
  };


  return cyPolygon;
});