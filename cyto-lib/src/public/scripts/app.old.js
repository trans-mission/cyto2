define([
  'cyto',
  'jquery', 
  'highlight'
  ]

  //on document load, init app
  , function(Cyto, $, hljs) {

    var cyto = window.cyto = {};

    $(function() { //on document load

      var screenWidth   = window.innerWidth
        , screenHeight  = window.innerHeight
        , xhrObjLoader  = new XMLHttpRequest()
        , loadedModules = [] //track modules for unloading later
        , defaultSketch;

      hljs.initHighlightingOnLoad();
      
      xhrObjLoader.addEventListener('load', function(evt) {
        var sketchList = JSON.parse(evt.target.responseText)
          , items = [];

        Array.prototype.forEach.call(sketchList, function(sketch) {
          items.push('<li><a href="' + sketch.src + '">' + sketch.title + '</a></li>');
          if(sketch.default) {
            defaultSketch = sketch.src;
          }
        });

        $('ul#sketch-list').append(items);
        addEventHandlers();
        //load first script for dev
        loadSelectedSketch(defaultSketch);

      }, false);

      xhrObjLoader.open('get', 'sketches.json');
      xhrObjLoader.send();

      /**
       *
       * Event Handlers 
       *
       */

      function addEventHandlers() {
        //preserve modules when loaded to reference them for unloading (
        //requirejs doesn't provide a way to unload AMD modules
        requirejs.onResourceLoad = function (context, map, depArray) {
          loadedModules.push({name: map.name, url: map.url});
        }

        //click menu items to load next sketch
        $('a').click(function(e) {
          var path = $(this).attr('href');

          e.preventDefault();

         loadSelectedSketch(path);
        });
      }

      /**
       *
       * Private Functions 
       *
       */

      function clearLoadedModules() {
        var scripts = document.scripts,
            context = require.s.contexts['_'];

        //destroy previous cyto, put on the global namespace

        if(cyto.engine) {
          //clear the animation frame
           window.cancelAnimationFrame(cyto.engine.animationId);
           window.cyto = window.cy = cyto = null;
        }

        //deletes the module properties from the requirejs context
        loadedModules.forEach(function(module) {

          delete(context.defined[module.name]);
          delete(context.urlFetched[module.url]);

          //remove the script tag HTML element
          Array.prototype.slice.call(scripts).forEach(function(script) {
            if(script.src.search(module.url) !== -1) {
              script.parentNode.removeChild(script);
            }
          });
        });
      }

      function loadSelectedSketch(path) {
        removeOldCanvas();
        createNewCanvas();
        clearLoadedModules();

        window.cyto = window.cy = cyto = new Cyto();

        var xhr = new XMLHttpRequest();

        xhr.addEventListener('load', function(evt) {
          var data = evt.target.response
            , script = document.createElement('script');

          script.type = 'text/javascript';
          script.innerHTML = data;

          document.body.appendChild(script);

          cyto.start(document.getElementById('sketch'));

          //$('#code').html('<section><pre><code class="javascript">' + data + '</code></pre></section>');
          //$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        }, false);

        xhr.open('get', path);
        xhr.send();

        //loads sketches as requirejs modules
       // $.get(path, function(data) {

          //TODO: parse script string and inject core sketch modules onload, rather than within each sketch
          //console.log(typeof data);
          
          //$('#code').html('<section><pre><code class="javascript">' + data + '</code></pre></section>');
          //$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        // });
      }

      function removeOldCanvas() { //TODO: remove div container instead of canvas element (see fn below)
        if($('canvas').length) {
          $('canvas').remove();
        }
      }

      function createNewCanvas() {
        console.log("here");
        //$('<canvas id="sketch" width="'+screenWidth+'" height="'+screenHeight+'"></canvas>').appendTo('body');
        $('<div id="sketch" width="'+screenWidth+'" height="'+screenHeight+'"></div>').appendTo('body');
      }
  });

  window.addEventListener('resize', function() {
    cyto.resize();
  });

  //TODO: App Key Shortcuts

  // document.addEventListener('keydown', function(e) {
  //   console.log(e.keyCode);
  //   console.log( String.fromCharCode(e.keyCode) );
  // });
});