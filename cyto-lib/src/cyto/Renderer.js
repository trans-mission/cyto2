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

var Renderer = function(root) {

  this._rootAccessible = true;

  var canvas = root.canvas
    , type = (
      root.rendererType == 'canvas' ||
      root.rendererType == 'webgl') ?
      root.rendererType :
      false
      ;

  if(!type) {

    this.errors.typeNotFound(rendererType);
    return;

  } else if(type == 'canvas') {

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');


    //default settings
    //TODO: set defaults
    // stroke and line styles

    Object.defineProperty(this, 'lineWidth', {
      //default line width is 1.0
      get: function()  { return this.ctx.lineWidth },
      set: function(w) { this.ctx.lineWidth = w;   }
    });

    // TODO: lineCap

    // TODO: lineJoin

    // TODO: miterLimit

    // TODO: getLineDash()

    // TODO: setLineDash()

    // TODO: lineDashOffset

    Object.defineProperty(this, 'strokeStyle', { //wraps canvas ctx
      get: function()  { return this.ctx.strokeStyle },
      set: function(c) { this.ctx.strokeStyle = c;   }
    });

    Object.defineProperty(this, 'hasStroke', {
      get: function()     { return this.hasStroke  },
      set: function(bool) { this.hasStroke = bool; }
    });

    // fill

    Object.defineProperty(this, 'fillStyle', { //wraps canvas ctx
      get: function()  { return this.ctx.fillStyle },
      set: function(c) { this.ctx.fillStyle = c;   }
    });

    Object.defineProperty(this, 'hasFill', {
      get: function()     { return this.hasFill  },
      set: function(bool) { this.hasFill = bool; }
    });

    //initial default settings

  } else {
    console.error('Cyto error: Sorry, webgl is not yet supported');
  }

  Object.defineProperty(this, 'width', {
    get: function() {  return this.canvas.width },
    set: function(w) {
      this.canvas.style.width = w + 'px';
      this.canvas.width       = w;
    }
  });

  Object.defineProperty(this, 'height', {
    get: function() {  return this.canvas.height },
    set: function(h) {
      this.canvas.style.height = h + 'px';
      this.canvas.height       = h;
    }
  });
};


Renderer.prototype.applyBackground = function (c) {

  //save the context on a stack
  this.ctx.save();
  this.ctx.fillStyle = c;

  // now fill the canvas
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.restore();
};

Renderer.prototype.bg = function (c) { //short hand
  this.background(c);
};

Renderer.prototype.background = function (c) { //short hand
  this.applyBackground(c);
};

Renderer.prototype.clear = function () {
  this.ctx.save(); //save the context on a stack
  this.ctx.fillStyle = this.background;
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);  // now fill the canvas
  this.ctx.restore(); //save the context on a stack
}

Renderer.prototype.beginPath = function () {
  this.ctx.beginPath();
};

Renderer.prototype.clearPath = function () {
  this.ctx.beginPath();
};

Renderer.prototype.getContext = function () {
  return this.ctx;
};

//Strokes the subpaths with the current stroke style
Renderer.prototype.stroke = function (c) {
  if(c !== undefined) this.strokeStyle = c;
  this.hasStroke = true;
  this.ctx.stroke();
};

Renderer.prototype.noStroke = function (color) {
  this.hasStroke = false;
  //this.strokeStyle = 'rgba(0,0,0,0)';
};

Renderer.prototype.fill = function (c) {
  if(c !== undefined) this.fillStyle = c;
  this.hasFill  = true;
  this.ctx.fill();
};

Renderer.prototype.noFill = function () {
  this.hasFill = false;
  //this.strokeStyle = 'rgba(0,0,0,0)';
};
