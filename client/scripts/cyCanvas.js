Template.cyCanvas.onRendered(function() {
  var canvas = this.find('#cyCanvas');

  //make canvas fullscreen
  $(canvas).width(window.innerWidth);
  $(canvas).height(window.innerHeight);

});

Template.cyCanvas.helpers({

});

Template.cyCanvas.events({

  'click': function () {

    alert("you clicked me");
  }

});
