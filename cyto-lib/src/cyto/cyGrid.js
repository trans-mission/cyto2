define(['/cyDrawingObject.js', '/cyUtils.js'], function (DrawingObject, utils) {

  var cyGrid = function(options) {
    
    this.root = utils.getRootInstance();

    this.strokeStyle = this._strokeStyle = (options && options.strokeStyle) ? options.strokeStyle : '#fff';
    this.fillStyle   = this._fillStyle   = (options && options.fillStyle)   ? options.fillStyle   : '#fff';
    this.lineWidth   = this._lineWidth   = (options && options.lineWidth)   ? options.lineWidth   : .5;

    this._x      = (options && options.x)      ? options.x      : 0;
    this._y      = (options && options.y)      ? options.y      : 0;
    this._width  = (options && options.width)  ? options.width  : this.root.canvas.width;
    this._height = (options && options.height) ? options.height : this.root.canvas.height;
    this._scale  = (options && options.scale)  ? options.scale  : 1;
    this._stepX  = (options && options.stepX)  ? options.stepX  : 20;
    this._stepY  = (options && options.stepY)  ? options.stepY  : 20;

    this._cells  = [];
    this._rows   = 0;
    this._cols   = 0;


    Object.defineProperty(this, 'cells', {
      get: function() { return this._cells; }
    });


    this.cells.forEach = this._iterateCells.bind(this);

    //expose public methods
    this.draw = this._drawGrid;

    //links 'this' to canvas 2D drawing api
    this._bindToView();

    //setup initial cell table

    this._cols = this._width / this._stepX;
    this._rows = this._height / this._stepY;

    this._makeCellTable(this._x, this._y, this._width, this._height, this._stepX, this._stepY);
  };

  var p = cyGrid.prototype = new DrawingObject();

  //currently only works with non-remainder integer divisions of rows and columns; no fractions
  //TODO: handle fractions in grid size calculations

  p._drawGrid = function (x, y, width, height, stepX, stepY) {
    var x      = x      || this._x
      , y      = y      || this._y
      , width  = width  || this._width
      , height = height || this._height
      , stepX  = stepX  || this._stepX
      , stepY  = stepY  || this._stepY

      , oldCols = this._cols
      , oldRows = this._rows;

    this._cols = width/stepX;
    this._rows = height/stepY;

    if(this._cols !== oldCols || this._rows !== oldRows) {
      this._makeCellTable(x, y, width, height, stepX, stepY);
    }

    this.save();

    this._fillCells();

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

    this.scale(this._scale, this._scale);

    for (var i = x; i <= x + width + this.lineWidth; i += stepX) {
      this.beginPath();
      this.moveTo(i, y);
      this.lineTo(i , y + height);
      this.stroke();
      this.clearPath();
    }

    for (var i = y; i <= y + height + this.lineWidth; i += stepY) {
      this.beginPath();
      this.moveTo(x, i);
      this.lineTo(x + width , i);
      this.stroke();
      this.clearPath();
    }

    this.restore();
  };

  p.cell = function(row, col, setting) {
    if(setting) {
      this._cells[col][row].on = setting;
    } else {
      try {
        return (this._cells[col][row] !== undefined) ? this._cells[col][row]: false;
      } catch(e) {
        return false;
      }
    }
  };

  p._fillCells = function() {
    this.save();
    this.scale(this._scale, this._scale);
    for(var c = 0; c < this._cols; c++) {
      for(var r = 0; r < this._rows; r++) {
        if(this._cells[c][r].on) {
          this.fill(this.fillStyle);
          this.rect(this._cells[c][r].x, this._cells[c][r].y, this._stepX, this._stepY, 0);
        }
      }
    }
    this.restore();
  };

  p._iterateCells = function(callback) {
    for(var r = 0; r < this._rows; r++) {
      for(var c = 0; c < this._cols; c++) {
        callback(this._cells[c][r]);
      }
    }
  };

  p._makeCellTable = function (x, y, width, height, stepX, stepY) {
    this.cells.total = this._cols * this._rows;
    this.cells.rows  = this._rows;
    this.cells.cols  = this._cols;
    
    for(var c = 0; c < this._cols; c++) {
      this._cells[c] = [];
      for(var r = 0; r < this._rows; r++) {
        this._cells[c][r] = { 'x': x + c * stepX, 'y': y + r * stepY, row: r, col: c, on: false };
      }
    }
  };

  return cyGrid;
});