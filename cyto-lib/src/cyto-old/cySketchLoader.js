define(function () {

  var cySketchLoader = function(root) {};

  cySketchLoader.prototype = {

    loadSketch: function(path, callback) {

      //removeOldCanvas();
      //createNewCanvas();
      //clearLoadedModules();

      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function(evt) {

        var data = evt.target.response
          , script = document.createElement('script');

        script.type = 'text/javascript';
        script.innerHTML = data;

        document.body.appendChild(script);

        //cyto.start(document.getElementById('sketch'));

        //$('#code').html('<section><pre><code class="javascript">' + data + '</code></pre></section>');
        //$('pre code').each(function(i, e) {hljs.highlightBlock(e)});

        if(callback && typeof(callback) === 'function') {
          callback();
        }

      }, false);

      xhr.open('get', path);
      xhr.send();
    }

  };
  
  return cySketchLoader;

});