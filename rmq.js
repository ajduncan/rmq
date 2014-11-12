Requests = new Mongo.Collection("requests");
Categories = new Mongo.Collection("categories");

// db.requests.insert({ text: "Hello world!", createdAt: new Date(), owner: "LOLSMEE" });
// db.categories.insert({ name: "Type 1" });

Router.route('/', function() {
  templateData = { requests: Requests.find({}), categories: Categories.find({}) };
  this.render('home', {data: templateData} );
});

Router.map(function() {

  this.route('requests', {
    data: function() {
      templateData = { requests: Requests.find({}), categories: Categories.find({}) };
      return templateData;
    }
  });

});

if (Meteor.isClient) {

  Template.addRequest.events({
    "submit .new-request": function (event) {
      // This function is called when the new request form is submitted

      var text = event.target.text.value;
      var name = event.target.name.value;
      var category = event.target.category.value;
      Meteor.call("addRequest", text, name, category);

      // Clear form
      event.target.text.value = "";
      event.target.name.value = "";
      event.target.category.value = "";

      // Prevent default form submit
      return false;
    }
  });

/*
  Template.addrequest.helpers({
  });

  Template.addrequest.events({
  });
*/

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  addRequest: function (text, name, category) {
    Requests.insert({
      owner: name,
      createdAt: new Date(),
      category: category,
      text: text
    });
    /* Meteor.userId(), */
    /* username: Meteor.user().username */
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
    console.log("TEST?");
  });
}
