if (Meteor.isClient) {

  Template.cyEditor.helpers({

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

  Template.cyEditor.events({

    'click button': function (e, t) {

      var code = t.find("#editor").value;

      Meteor.call('saveFile', code, "test.js", "sketches", "utf8", function(){
        console.log("some callback");
      });
    }

  });
}
