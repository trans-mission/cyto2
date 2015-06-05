var signature  = require('./signature')
  , express    = require('express')
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

    // order of middleware important, invoked sequentially

    //default routes
    app.get('/', function(req, res) {
      res.render('index', {title: 'cyto'});
    });

    //static routes
    app.use(express.static(path.join(root, '/')));
    app.use(express.static(path.join(root, '/../bower_components')));
    app.use(express.static(path.join(root, 'public')));
    app.use(express.static(path.join(root, 'sketches')));
    app.use(express.static(path.join(root, 'sandbox')));
    app.use(express.static(path.join(root, 'cyto')));

    //app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));


    server.listen(app.get('port'), function(){
      console.log('   info  - '.cyan + 'cyto server listening on port ' + app.get('port'));
    });

  }
};
