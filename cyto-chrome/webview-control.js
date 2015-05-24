var indicator = document.querySelector('.indicator');

indicator.innerText = "webview control loaded";

var webview = document.getElementById('webview');


var loadStart = function() {
  indicator.innerText = "webview load started";
};

var loadStop = function() {
  indicator.innerText = "webview load stopped";
};

webview.addEventListener('loadstart', loadStart);
webview.addEventListener('loadstop', loadStop);
