if (Meteor.isClient) {

  Template.CyEditor.helpers({

      "editorOptions": function() {
        return {
          lineNumbers: true,
          mode: "javascript"
        }
      },

      "editorCode": function() {
        return "Code to show in editor";
      }

  });

  Template.CyEditor.events({

    'click button': function (e, t) {

      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);

      var code = t.find("#cyEditor").value;

      Meteor.call('saveFile', code, "test.js", "sketches", "utf8", function(){
        console.log("some callback");
      });
    }

  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    Meteor.methods({
      saveFile: function(blob, name, path, encoding) {
        var path = cleanPath(path), fs = Npm.require('fs'),
          name = cleanName(name || 'file'), encoding = encoding || 'binary',
          chroot = Meteor.chroot || 'public';
        // Clean up the path. Remove any initial and final '/' -we prefix them-,
        // any sort of attempt to go to the parent directory '..' and any empty directories in
        // between '/////' - which may happen after removing '..'
        path = chroot + (path ? '/' + path + '/' : '/');
        

        // TODO Add file existance checks, etc...
        fs.writeFile('../../../../../' + path + name, blob, encoding, function(err) {
          if (err) {
            throw (new Meteor.Error(500, 'Failed to save file.', err));
          } else {
            console.log('The file ' + name + ' (' + encoding + ') was saved to ' + path);
          }
        }); 
     
        function cleanPath(str) {
          if (str) {
            return str.replace(/\.\./g,'').replace(/\/+/g,'').
              replace(/^\/+/,'').replace(/\/+$/,'');
          }
        }
        function cleanName(str) {
          return str.replace(/\.\./g,'').replace(/\//g,'');
        }
      }
    });

  });
}
