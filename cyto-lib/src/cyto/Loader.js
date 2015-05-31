var Loader = function() {};

Loader.prototype.loadSketch = function(path, callback) {

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function (evt) {

    if (xhr.readyState === 4) {

      if (xhr.status === 200) {

        if(callback && typeof(callback) === 'function') {
          callback(evt.target.response);
        }

      } else if(xhr.status == 404) {
         console.error('Cyto error:',  path, 'not found');

      } else {
         console.error('Cyto error:',  xhr.statusText);

      }
    }
  };

  xhr.open('get', path);
  xhr.send();
};
