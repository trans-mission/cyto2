// chrome.app.window alwaysOnTop property is supported in Chrome M32 or later.
// The option will be hidden if not supported in the current browser version.
var isAlwaysOnTopSupported = typeof(chrome.app.window.current().setAlwaysOnTop) !== 'undefined';

var version = window.navigator.appVersion;
version = version.substr(version.lastIndexOf('Chrome/') + 7);
version = version.substr(0, version.indexOf('.'));
version = parseInt(version);

// Helper functions
$ = function(selector) { return document.querySelector(selector); }

// Set initial value of always on top
if (isAlwaysOnTopSupported) {
  chrome.app.window.current().isAlwaysOnTop();
}

//chrome.app.window.current().moveTo(1, 1);

//launch in fullscreen
chrome.app.window.current().fullscreen();