define(function () {

  /* PRIVATE VARS
   --------------------------------------------------- */

  var _this;


  /* MY CLASS
   --------------------------------------------------- */

  var cyMath = function(root) {

    _this      = this;
    _this.root = root;


  };

  /* MY CLASS PROTOTYPE
   --------------------------------------------------- */

  cyMath.prototype = {

    /**
     * @public
     * @method random
     * @min {Number} A number representing the minum range value
     * @max {NUmber} A number representing the maximum range value
     **/
    
    random: function() {
      if(arguments.length === 0) {
        return Math.random();
      }
      if(arguments.length === 1) {
        return Math.random() * arguments[0];
      }
      var min = arguments[0], max = arguments[1];

      return Math.floor( Math.random() * ( max - min + 1) + min);
    }
  };

  /* PRIVATE FUNCTIONS
   --------------------------------------------------- */

  return cyMath;
});