define(function() {

  var cyConstants = {

    ROOT_CLASS:    {},
    ROOT_INSTANCE: {},

    OTHER:   0,
    WINDOWS: 1,
    MAXOSX:  2,
    LINUX:   3,

    PI:         Math.PI,
    TWO_PI:     Math.PI * 2,
    HALF_PI:    Math.PI / 2,
    THIRD_PI:   Math.PI / 3,
    QUARTER_PI: Math.PI / 4,

    sin   :  Math.sin,
    cos   :  Math.cos,
    atan2 :  Math.atan2,
    sqrt  :  Math.sqrt,
    round :  Math.round,
    abs   :  Math.abs,
    pow   :  Math.pow,
    min   :  Math.min,
    max   :  Math.max;

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
