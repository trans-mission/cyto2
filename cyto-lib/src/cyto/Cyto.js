var cyto = function(rendererType, canvasId) {

  type = (
    rendererType == 'canvas' ||
    rendererType == 'webgl') ?
    rendererType :
    false;

  if(!type) {
    console.error('Cyto error: No renderer "' + rendererType +
    '". Only canvas and webgl are supported!');
  }

  var loader = new Loader()
    , canvas = document.getElementById(canvasId)
    , sketch = canvas.getAttribute('data-sketch')
    , path   = '/sketches/' + sketch + '.js'
    ;

  loader.loadSketch(path, function(data) {
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.innerHTML = data;

    document.body.appendChild(script);
  });
};
