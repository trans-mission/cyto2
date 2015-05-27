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

  window.addEventListener('resize', function() {
    cyto.resize();
  });

});
