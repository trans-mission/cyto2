var socket = io.connect('http://localhost:3333');

  socket.on('connected', function() {
    console.log('socket.io connected to server');
  });

  /* Socket Commands from Server
     -------------------------------------------------- */

  //handle FCB1010 pedal event messages 

  socket.on('pedalEvent', function (data) {

    var video = data.args[0].value;
    var $videoElement = $('video');

    if(video === 1) {

      $videoElement.attr('src', 'videos/ships.webm');
      // $videoElement[0].currentTime = 1;
      $videoElement[0].play();


    } else if (video === 2) {

      $videoElement.attr('src', 'videos/nasa.webm');
      // $videoElement[0].currentTime = 1;
      $videoElement[0].play();
    }
  });