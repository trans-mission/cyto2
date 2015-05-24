define(function () {

/**
 * @module cyEventDispatcher
 *
 * @credits: mr doob, createjs, mozilla
 */

  var cyEventDispatcher = function(target) {

    if(target !== undefined) this.apply(target);
  };


  cyEventDispatcher.prototype = {

    apply: function(target) {
      target.addEventListener        = this.addEventListener;
      target.hasEventListener        = this.hasEventListener;
      target.removeEventListener     = this.removeEventListener;
      target.removeAllEventListeners = this.removeAllEventListeners;
      target.dispatchEvent           = this.dispatchEvent;
      target.on                      = this.on;
      target.off                     = this.off;
    },
  
    /**
     * @protected
     * @property _listeners
     * @type Object
     **/

    _listeners: null,

    /**
     *
     * Appends the cyEventDispatcher class prototype to a supplied class prototype
     *
     *  @param type {String} - A class prototype
     *
     */

    addEventListener: function (type, listener) {
      var listeners;

      if(this._listeners === undefined) this._listeners = {};

      listeners = this._listeners;

      if(!listeners[type]) listeners[type] = [];
      if(listeners[type].indexOf(listener) === - 1) listeners[type].push(listener);
    },

    hasEventListener: function (type, listener) {
      if(this._listeners === undefined ) return false;

      var listeners = this._listeners;

      if (listeners[type] !== undefined && 
          listeners[type].indexOf(listener) !== - 1) {
          
        return true;
      } else {
        return false;
      }
    },

    removeEventListener: function (type, listener) {
      if(this._listeners === undefined ) return;

      var listeners = this._listeners;
      var listenerArray = listeners[ type ];

      if(listenerArray !== undefined ) {
        var index = listenerArray.indexOf( listener );

        if(index !== - 1) {
          listenerArray.splice( index, 1 );
        }
      }
    },

    dispatchEvent: function (event) {
      if (this._listeners === undefined) return;
      
      var listeners = this._listeners;
      var listenerArray = listeners[ event.type ];

      if ( listenerArray !== undefined ) {
        var array = [];
        var length = listenerArray.length;

        event.target = this;

        for ( var i = 0; i < length; i ++ ) {
          array[ i ] = listenerArray[ i ];
        }
        for ( var i = 0; i < length; i ++ ) {
          array[ i ].call( this, event );
        }
      }
    },

    on: function (type, listener) {
      this.addEventListener(type, listener);
    },

    off: function (type, listener) {
      this.removeEventListener(type, listener);
    }
  };

  return cyEventDispatcher;
});