cyUtils = {

  bindObjects: function(targObj, srcObj, filterInc, filterExc) {
    for(var key in srcObj) {

      if(filterInc && this.contains(filterInc, key) ||
         filterInc === undefined) {
        if(filterExc && !filterExc.hasOwnProperty(key) ||
           filterExc === undefined) {
          if(typeof srcObj[key] === 'function') {
            targObj[key] = srcObj[key].bind(srcObj);
          } else {
            targObj[key] = srcObj[key];
          }
        }
      }
    }
  },

  _componentToHex: function (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  },

  getObjectSize: function (o) {
    var p = Object.getPrototypeOf(o)
      , s = 0
      , k;

    for(k in o) if(o.hasOwnProperty(k)) ++s;
    for(k in p) if(p.hasOwnProperty(k)) ++s;

    return s;
  },

  generateRandomSequence: function(length) {
    var randomSequence = '';

    for(var i = 0; i < length; i++) {
      randomSequence += Math.round(Math.random() * 9);
    }
    return randomSequence;
  },

  getPropertiesList: function(object) {
    var list = []
      , key;

    for(key in object) {
      list.push(key);
    }
    return list;
  },

  getRootInstance: function () {
    var object      = window
      , hasInstance = false
      , root;

    do {
      if(hasInstance) break;
      try {
        Object.getOwnPropertyNames(object).forEach(function(name) {

          if(name === 'webkitStorageInfo') return; //deprectated window object

          if(object[name] instanceof cyConstants.ROOT_CLASS) {
            root = object[name];
            hasInstance = true;
          }
        });
      } catch(e) {
        console.error(e);
      }
    } while(object = Object.getPrototypeOf(object));
    return (root !== undefined) ? root: false;
  },

  hexToRgb: function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  },

  parseColor: function(input) {
    var m;

    //numeric values will be easier to parse than names, so do these first

    //8bit monochromatic values 0-255
    if(typeof(input) === 'number') {
      return "#" + componentToHex(input) + componentToHex(input) + componentToHex(input);
    }

    m = input.match(/^#([0-9a-f]{3})$/i);

    if(m) {
      // in three-character format, each value is multiplied by 0x11 to give an
      // even scale from 0x00 to 0xff
      return [
          parseInt(m[1].charAt(0),16)*0x11,
          parseInt(m[1].charAt(1),16)*0x11,
          parseInt(m[1].charAt(2),16)*0x11
      ];
    }

    //now for the full six-digit format:

    m = input.match(/^#([0-9a-f]{6})$/i);

    if(m) {
      return [
          parseInt(m[1].substr(0,2),16),
          parseInt(m[1].substr(2,2),16),
          parseInt(m[1].substr(4,2),16)
      ];
    }

    //and now for rgb() format:

    m = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if(m) {
      return [m[1],m[2],m[3]];
    }

    //optionally, you can also add support for rgba format, and even hsl/hsla if you add an HSL2RGB conversion function.

    //finally, the named colours.

    var colorsByName = {aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",
    bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",
    cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",
    cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",
    darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",
    darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",
    deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",
    fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",
    greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred :"#cd5c5c",indigo :"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",
    lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",
    lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",
    lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",
    limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",
    mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",
    mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",
    navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",
    orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",
    peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",
    royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",
    silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",
    tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",
    whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"
    };

    return colorsByName[input];
  },

  range: function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = Array(length);

    while (idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  },

  rgbToHex: function(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
};

lodash.merge(cyUtils, lodash);
