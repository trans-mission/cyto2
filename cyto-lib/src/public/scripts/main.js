'use strict';

require.config({

  baseUrl: '/scripts',

  paths: {

    // note: bower_components already included in server static paths
    // so there is no need to specify the directory here

    highlight       : '/highlightjs/highlight.pack',
    underscore      : '/underscore/underscore',
    jquery          : '/jquery/dist/jquery',
    jqueryUi        : '/jquery-ui/jquery-ui',

    Cyto : '/cyMain', //cyto-lib

  },

  shim: {
    highlight : { exports : 'hljs' }
  }

});

require(['Cyto'], function(app) {

  console.log(app);
});
