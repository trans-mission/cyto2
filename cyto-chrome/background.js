//the background page is responsible for opening the ui of your app

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
  	id: "CytoWindow",
    bounds: {
      width: 800,
      height: 800
    }
  });
});
