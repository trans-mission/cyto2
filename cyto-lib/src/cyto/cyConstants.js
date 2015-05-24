define(function() {

  var cyConstants = {

    ROOT_CLASS:    {},
    ROOT_INSTANCE: {},

    OTHER:   0,
    WINDOWS: 1,
    MAXOSX:  2,
    LINUX:   3,

    PI:         Math.PI,
    TWO_PI:     2 * Math.PI,
    TAU:        2 * Math.PI,
    HALF_PI:    Math.PI / 2,
    THIRD_PI:   Math.PI / 3,
    QUARTER_PI: Math.PI / 4,

    VIEW_CANVAS_RENDERING_CONTEXT_2D: [ 

    //represents the context properties inherited by the view

    //drawing methods
    'arc', 
    'arcTo', 
    'beginPath', 
    'bezierCurveTo',
    'clearRect',
    'clip',
    'closePath',
    'createImageData',
    'createLinearGradient',
    'createPattern',
    'createRadialGradient',
    'drawImage',
    'drawCustomFocusRing',
    'drawSystemFocusRing',
    'fill'
    ]
  };

  return cyConstants;
});