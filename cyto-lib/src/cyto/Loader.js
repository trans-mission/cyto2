var Loader = function() {};

/**
* LoadSketch
*
* @method LoadSketch
* @param {String} path       - path to js file
* @param {Function} callback - callback function
*/

Loader.prototype.loadSketch = function(path, callback) {

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function (evt) {

    if (xhr.readyState === 4) {

      if (xhr.status === 200) {

        var script = document.createElement('script')
          , data   = evt.target.response
          ;

        script.type = 'text/javascript';
        script.innerHTML = data;

        document.body.appendChild(script);

        if(callback && typeof(callback) === 'function') {
          callback();
        }

      } else if(xhr.status == 404) {
        cyto.errors.resourceNotFound(path);
      } else {
        cyto.errors.xhr(xhr.status);
      }
    }
  };

  xhr.open('get', path);
  xhr.send();
};
