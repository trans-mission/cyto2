var signature  = require('./signature')
  //, config     = require('./')
  , express    = require('express')
  , morgan     = require('morgan')
  , bodyParser = require('body-parser')
  , colors     = require('colors')
  , path       = require('path')
  , app        = express()
  , server     = require('http').createServer(app)
  ;

//-------------------------------------------------------

module.exports = {

  start: function(root) {

    //set the server port
    app.set('port',  process.env.PORT || 3333);

    //setup the view directories
    app.set('views',     path.join(root, 'public/views'));
    app.locals.basedir = path.join(root, 'public/views');

    //set view engine
    app.set('view engine', 'jade');

    // set up our express application
    app.use(morgan('dev'));     // log every request to the console
    //app.use(bodyParser());    // get information from html forms
    app.use(bodyParser.json()); //specifically parse json

    //the order of which middleware are "defined" is important. the are invoked sequentially

    //default routes
    app.use('/', require('./routes/default'));

    //static routes
    require('./routes/static')(root, app);

    server.listen(app.get('port'), function(){
      console.log('   info  - '.cyan + 'cyto server listening on port ' + app.get('port'));
    });

  }
};
