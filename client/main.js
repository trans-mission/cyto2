if (Meteor.isClient) {

  Template.editor.helpers({

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

  Template.editor.events({

    'click button': function (e, t) {

      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);

      var code = t.find("#editor").value;

      Meteor.call('saveFile', code, "test.js", "sketches", "utf8", function(){
        console.log("some callback");
      });
    }

  });
}