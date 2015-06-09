/*
* Renderer
*
* Visit {Coming soon} for documentation, updates and examples.
*
* Copyright (c) 2014 whisperlab.io
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
* Primary Renderer Class
*
* @class Renderer
* @param {String} type   - renderer type (canvas or webgl)
* @param {String} canvas - target canvas element
*/

//ref: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

var Renderer = function() {

  //are public properties & methods root accessible (i.e. cyto.prop) ?
  this._rootAccessible = true;
  this._canvas  = cyto.canvas;

  if(!cyto.rendererType == 'canvas' ||
     !cyto.rendererType == 'webgl') {

    cyto.errors.typeNotFound(cyto.rendererType);
    return;

  } else if(cyto.rendererType == 'canvas') {

    this._context = this._canvas.getContext('2d');

    Object.defineProperty(this, 'lineWidth', {
      //default line width is 1.0
      get: function()  { return this._context.lineWidth },
      set: function(w) { this._context.lineWidth = w;   }
    });

    // TODO: lineCap

    // TODO: lineJoin

    // TODO: miterLimit

    // TODO: getLineDash()

    // TODO: setLineDash()

    // TODO: lineDashOffset

    Object.defineProperty(this, 'strokeStyle', { //wraps canvas _context
      get: function()  { return this._context.strokeStyle },
      set: function(c) { this._context.strokeStyle = c;   }
    });


    Object.defineProperty(this, 'fillStyle', { //wraps canvas _context
      get: function()  { return this._context.fillStyle },
      set: function(c) { this._context.fillStyle = c;   }
    });

    var hasStroke = false;
    Object.defineProperty(this, 'hasStroke', {
      get: function()     { return  hasStroke},
      set: function(bool) { hasStroke = bool; }
    });

    var hasFill = false;
    Object.defineProperty(this, 'hasFill', {
      get: function()     { return hasFill  },
      set: function(bool) { hasFill = bool; }
    });

  } else {
    console.error('Cyto error: Sorry, webgl is not yet supported');
  }

  Object.defineProperty(this, 'width', {
    get: function() {  return this._canvas.width },
    set: function(w) {
      this._canvas.style.width = w + 'px';
      this._canvas.width       = w;
      this._canvas.setAttribute('width', w);
    },
    enumerable: true
  });

  Object.defineProperty(this, 'height', {
    get: function() {  return this._canvas.height },
    set: function(h) {
      this._canvas.style.height = h + 'px';
      this._canvas.height       = h;
      this._canvas.setAttribute('height', h);
    },
    enumerable: true
  });
};


Renderer.prototype.applyBackground = function (c) {

  //save the context on a stack
  this._context.save();
  this._context.fillStyle = c;

  // now fill the canvas
  this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
  this._context.restore();
};

Renderer.prototype.bg = function (c) { //short hand
  this.background(c);
};

Renderer.prototype.background = function (c) { //short hand
  this.applyBackground(c);
};

Renderer.prototype.clear = function () {
  this._context.save(); //save the context on a stack
  this._context.fillStyle = this.background;
  // now fill the canvas
  this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
  this._context.restore(); //save the context on a stack
};

Renderer.prototype.beginPath = function () {
  this._context.beginPath();
};

Renderer.prototype.clearPath = function () {
  this._context.beginPath();
};

Renderer.prototype.getContext = function () {
  return this._context;
};

//Strokes the subpaths with the current stroke style
Renderer.prototype.stroke = function (c) {
  if(c !== undefined) this.strokeStyle = c;
  this.hasStroke = true;
  this._context.stroke();
};

Renderer.prototype.noStroke = function (color) {
  this.hasStroke = false;
  this.strokeStyle = 'rgba(0,0,0,0)';
};

Renderer.prototype.fill = function (c) {
  if(c !== undefined) this.fillStyle = c;
  this.hasFill  = true;
  this._context.fill();
};

Renderer.prototype.noFill = function () {
  this.hasFill = false;
  //this.strokeStyle = 'rgba(0,0,0,0)';
};
