if (Meteor.isClient) {
  Session.setDefault("counter", 0);

  Template.addrequest.helpers({
  });

  Template.addrequest.events({
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
