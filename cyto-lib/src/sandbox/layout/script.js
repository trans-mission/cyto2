$(function() {

  var NUM_VISIBLE = 3
    , MAX_WIDGET_PANEL_WIDTH = 200
    , MIN_WIDGET_PANEL_WIDTH = 50
    ;

  var capWidthAt = false;

  $("#widgets-panel").on('mousedown', function(){
    console.log("mouse down");
  });

   $("#widgets-panel").on('mouseup', function(){
    if(capWidthAt) capWidthAt = false;
  });

  function resizeAll(e,ui) {

    var $this = $(this)
      , dir = getDirection(ui.size.width, ui.prevSize.width) ? 'out' : 'in'
      , id = parseInt(this.id.replace('w', ''))
      , numberToResize = NUM_VISIBLE - id
      , deltaWidth = ui.prevSize.width - ui.size.width
      , lastElemNum = NUM_VISIBLE
      , sumOfWidths = 0
      ;

    $(".resizable").each(function() {   
      sumOfWidths += $(this).width();
    });

    if(dir == 'out') {

      if(id === lastElemNum && sumOfWidths > MAX_WIDGET_PANEL_WIDTH * 3) {

        //by triggering the mouseup event we can force resize-dragging to stop
        $this.trigger('mouseup'); 

        var remainderWidth = (MAX_WIDGET_PANEL_WIDTH * 3) - (sumOfWidths - $(this).width());

        $(this).width(remainderWidth);
        return;

      } else if(id < lastElemNum && $this.next().width() <= MIN_WIDGET_PANEL_WIDTH) {
        
        if(!capWidthAt) {
          capWidthAt = ui.prevSize.width;
        }

        ui.size.width = capWidthAt;
        $this.width(capWidthAt);
        return;
      }

    } else {
      if(capWidthAt) capWidthAt = false;
    }

    for(var i = id+1; i < id+2; i++) {
      var $e = $('#w'+i)
        , w  = $e.width();

      $e.width(w + deltaWidth);
    }
  }

  function getDirection(currWidth, prevWidth) {
    return currWidth > prevWidth;
  }

  $(".resizable").resizable({ 
    minWidth: MIN_WIDGET_PANEL_WIDTH,
   // maxWidth: MAX_WIDGET_PANEL_WIDTH,
    containment: 'parent',
    //alsoResize: '#w2',
    handles: "e",
    resize: resizeAll
  });


});
