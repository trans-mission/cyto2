var ErrorMessages = function() {

  /**
  * Type Not Found
  */

  this.typeNotFound = function (type) {
    console.error('Cyto error: No renderer "' + type +
    '". Only canvas and webgl are supported!');
  };

  /**
  * Resource Not Found
  */

  this.resourceNotFound = function(path) {
    console.error('Cyto error:',  path, 'not found');
  };

  /**
  * Other XHR Status Error
  */

  this.xhr = function(statusText) {
    console.error('Cyto error:',  statusText);
  };

};
