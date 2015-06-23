var http = require('http')
  , path = require('path')
  , scenes
  ;

module.exports = {

  start: function(root) {

    scenes = require( path.join(root, 'scenes') );

    console.log(scenes);

    http.createServer(function (req, res) {

      try {
       //log the request on console

        res.writeHead(200, {'Content-Type': 'application/json'});

        switch(req.url) {

        case '/scenes'  :
          res.end(JSON.stringify(scenes));
          break;

        default:
          res.end(JSON.stringify({}));
          break;
        }

   } catch(err) {
       console.log(err);
   }

      // console.log(req);
      // res.writeHead(200, {'Content-Type': 'text/plain'});
      // res.end('Hello New York\n');
    }).listen(3001);
    console.log('Server running at http://localhost:3001/');

  }

};
