var udp = require('dgram').createSocket("udp4");
var osc = require('osc-min');
 
var outport = 9999;

sendHeartbeat = function() {
  var buf;

  buf = osc.toBuffer({
    address: "/heartbeat",
    args: [
      12, "sttttring", new Buffer("beat"), {
        type: "integer",
        value: 7
      }
    ]
  });
  console.log('sending heartbeat');
  return udp.send(buf, 0, buf.length, outport, "localhost");
};

setInterval(sendHeartbeat, 2000);