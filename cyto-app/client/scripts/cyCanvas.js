var cyCanvas = Template.cyCanvas;

cyCanvas.onRendered(function() {
  var canvas = this.find('#cyCanvas');

  //make canvas fullscreen
  $(canvas).width(window.innerWidth);
  $(canvas).height(window.innerHeight);

});

cyCanvas.helpers({

});

cyCanvas.events({

  'click': function () {

    alert("you clicked me");
  }

});
