var udp   = require('dgram');
var osc   = require('osc-min');

console.log(osc);

/*
An OSC Address Pattern is an OSC-string beginning with the character '/' (forward slash).
An OSC message has the following general format:
<address pattern>   <type tag string>   <arguments>
*/

var sock = udp.createSocket("udp4", function(msg, rinfo) {
  var error;
  try {
    return console.log(osc.fromBuffer(msg));
  } catch (_error) {
    error = _error;
    return console.log("invalid OSC packet");
  }
});

sock.bind("9999");