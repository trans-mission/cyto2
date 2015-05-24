/*
* cyView
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

define(['cyConfig.js','/cyUtils.js'], function (config, utils) {

  /**
  * Provides the primary View class
  * @module cyView
  */

  var _canvas  = document.createElement('canvas')
    , _context = _canvas.getContext('2d');

  /**
   * The View class wraps and extends the DOM's canvas element and drawing context,
   * providing additional properties, methods and events which get exposed to the
   * ctyo library's root object.
   * @class View
   */

  var cyView = function() {
    this.viewProperties = utils.getPropertiesList(this);
    utils.bindObjects(Object.getPrototypeOf(this), _context);

    // Object.defineProperty(this, 'lineWidth', {
    //   get: function()  { return this._lineWidth },
    //   set: function(w) { this._lineWidth = w;   }
    // });

  };

  var p = cyView.prototype = _context;

  //native canvas method overrides
  p.overridesList = ['fill', 'stroke'];
  
  p._stroke    = _context.stroke.bind(p);
  p._fill      = _context.fill.bind(p);
  p._hasStroke = true;
  p._hasFill   = false;

  p._initializeView = function (targetCanvasElement) {
     _canvas.setAttribute('id', 'cyto-' + targetCanvasElement.id);

    _canvas.setAttribute('width',  targetCanvasElement.width);
    _canvas.setAttribute('height', targetCanvasElement.height);

    targetCanvasElement.parentNode.replaceChild(_canvas, targetCanvasElement);

    this.width  = _canvas.width;
    this.height = _canvas.height;
  };

  p.bgColor = config.bgColor; //default cyto bg col

  p.background = function (c) {
    this.bgColor = c || this.bgColor;

    _context.save(); //save the context on a stack
    _context.fillStyle = this.bgColor; //TODO: make configurable
    _context.fillRect(0, 0, this.width, this.height);  // now fill the canvas
    _context.restore();
  };

  p.bg = function (c) {
    this.background(c);
  };

  p.clear = function () {
    _context.save(); //save the context on a stack
    _context.fillStyle = this.bgColor;
    _context.fillRect(0, 0, this.width, this.height);  // now fill the canvas
    _context.restore(); //save the context on a stack
  }

  p.clearPath = function () {
    this.beginPath();
  };

  p.getContext = function () {
    return _context;
  };

  p.lineWidth = function() {

  }

  p.stroke = function (color) {
    if(color !== undefined) {
      this.strokeStyle = color;
      this._hasStroke  = true;
    }
    if(this._hasStroke) {
      this._stroke();
    }
  };

  p.noStroke = function (color) {
    this._hasStroke = false;
    //this.strokeStyle = 'rgba(0,0,0,0)';
  };

  p.fill = function (color) {
    if(color !== undefined) {
      this.fillStyle = color;
      this._hasFill  = true;
    }
    if(this._hasFill) this._fill();
  };

  p.noFill = function () {
    this._hasFill = false;
    //this.strokeStyle = 'rgba(0,0,0,0)';
  };

  p.hasFill = function () {
    return this._hasFill;
  };

  p.hasStroke = function () {
    return this._hasStroke;
  };
  
  return cyView;
});