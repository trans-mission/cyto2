/**
* Provides the primary Renderer class
* @module cyto library object
*/

var cyto = function(rendererType, canvasId) {

  cyto = {};

  var loader = new Loader()
    , canvas = document.getElementById(canvasId)
    , sketch = canvas.getAttribute('data-sketch')
    , path   = '/sketches/' + sketch + '.js'
    , type = (
        rendererType == 'canvas' ||
        rendererType == 'webgl') ?
        rendererType :
        false
    ;

  if(!type) {
    console.error('Cyto error: No renderer "' + rendererType +
    '". Only canvas and webgl are supported!');
  } else {
    cyto.renderer = new Renderer(type, canvas);
  }

  loader.loadSketch(path, function(data) {
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.innerHTML = data;

    document.body.appendChild(script);
  });
};
