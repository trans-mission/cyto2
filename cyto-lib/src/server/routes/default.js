/*
 * Cyto App Routes
 */

var express = require('express')
  , router  = new express.Router();

/* Top-level middleware for every request
   -------------------------------------------------- */

router.use(function(req, res, next) {

  // log each request to the console
  //console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next();
});

/* Core Views / Pages
   -------------------------------------------------- */

router.get('/', function(req, res) {
  res.render('index', {title: 'cyto'});
});


module.exports = router;
