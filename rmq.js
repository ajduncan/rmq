Requests = new Mongo.Collection("requests");
// db.requests.insert({ text: "Hello world!", createdAt: new Date(), owner: "LOLSMEE" });

Router.route('/', function() {
  this.render('home');
});

Router.map(function() {

  this.route('requests', {
    data: function() {
      templateData = { requests: Requests.find({}) };
      return templateData;
    }
  });

});

if (Meteor.isClient) {
  Session.setDefault("counter", 0);

  Template.body.events({
    "submit .new-request": function (event) {
      // This function is called when the new task form is submitted

      var text = event.target.text.value;
      var name = event.target.name.value;
      Meteor.call("addRequest", text, name);

      // Clear form
      event.target.text.value = "";
      event.target.name.value = "";

      // Prevent default form submit
      return false;
    }
  });

  Template.addrequest.helpers({
  });

  Template.addrequest.events({
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  addRequest: function (text) {
    Requests.insert({
      text: text,
      createdAt: new Date(),
      owner: name /*, Meteor.userId(), */
      /* username: Meteor.user().username */
    });
  },
  deleteRequest: function (requestId) {
    var request = Requests.findOne(requestId);
    // Need to make sure Meteor user is an admin.
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Requests.remove(requestId);
  },
  updateRequest: function (requestId, text) {
    Requests.update(requestId, { $set: { text: text } });
  },
});


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
