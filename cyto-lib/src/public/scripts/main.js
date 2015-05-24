'use strict';

require.config({

  baseUrl: '/scripts',

  paths: {

    // note: bower_components already included in server static paths
    // so there is no need to specify the directory here

    underscore      : '/underscore/underscore',
    jquery          : '/jquery/dist/jquery',
    jqueryUi        : '/jquery-ui/jquery-ui',

    cyto : '/cyMain', //cyto-lib

  }

});

define(['cyto'], function(Cyto) {


  window.cy = window.cyto = new Cyto();


  var canvas = document.body.querySelector('canvas')
    , sketch = canvas.getAttribute('data-sketch') + '.js'
    , xhr    = new XMLHttpRequest();

  xhr.addEventListener('load', function(evt) {
    var data = evt.target.response
      , script = document.createElement('script');

    script.type = 'text/javascript';
    script.innerHTML = data;

    document.body.appendChild(script);

    console.log(cyto);

    cyto.init(document.getElementById('sketch'));

    //$('#code').html('<section><pre><code class="javascript">' + data + '</code></pre></section>');
    //$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
  }, false);

  xhr.open('get', '/sketches/' + sketch);
  xhr.send();

  window.addEventListener('resize', function() {
    cyto.resize();
  });

});
