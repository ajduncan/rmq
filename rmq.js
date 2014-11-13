Requests = new Mongo.Collection("requests");
Categories = new Mongo.Collection("categories");

// db.categories.insert({ name: "Type 1" });

// See: https://github.com/peerlibrary/meteor-peerdb/issues/17
// see also: https://github.com/aldeed/meteor-collection2/issues/31

var Schemas = {};

Schemas.Categories = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 100,
    optional: false
  }
});

Categories.attachSchema(Schemas.Categories);

// So why do we have a schema with autoform specifying html styles here?  That seems wrong.
Schemas.Request = new SimpleSchema({
  first_name: {
    type: String,
    label: "First name",
    max: 100,
    optional: false,
    autoform: {
      style: "width: 90%"
    }
  },
  last_name: {
    type: String,
    label: "Last name",
    max: 100,
    autoform: {
      style: "width: 90%"
    }
  },
  email: {
    type: String,
    label: "Email",
    regEx: SimpleSchema.RegEx.Email,
    optional: false,
    max:50,
    autoform: {
      style: "width: 90%"
    }
  },
  subject: {
    type: String,
    label: "Subject",
    max: 100,
    optional: false,
    autoform: {
      style: "width: 90%"
    }
  },
  text: {
    type: String,
    label: "Description",
    max: 2000,
    optional: false,
    autoform: {
      type: "textarea",
      rows: 6,
      style: "width: 90%"
    }
  },
  // http://stackoverflow.com/questions/23644355/how-to-generate-a-form-to-select-a-user-using-autoform-and-collection2-in-meteor
  category: {
    type: Schemas.Categories._id,
    label: "Category",
    autoform: {
      options: function () {
        var options = [];
        Categories.find().forEach(function (element) {
          options.push({
            label: element.name, value: element._id._str
          })
        });
        return options;
      }
    }
  }
});

Requests.attachSchema(Schemas.Request);


Router.route('/', function() {
  this.render('home');
});

Router.map(function() {

  this.route('requests', {
    data: function() {
      requests = Requests.find({});
      templateData = { requests: requests };
      return templateData;
    }
  });

});

if (Meteor.isClient) {

  Template.addRequest.events({
    "submit .new-request": function (event) {
      // This function is called when the new request form is submitted

      var first_name = event.target.first_name.value;
      var last_name = event.target.last_name.value;
      var email = event.target.email.value;
      var subject = event.target.subject.value;
      var category = event.target.category.value;
      var text = event.target.text.value;

      Meteor.call("addRequest", first_name, last_name, email, subject, category, text);

      // Clear form
      event.target.first_name.value = "";
      event.target.last_name.value = "";
      event.target.email.value = "";
      event.target.subject.value = "";
      event.target.text.value = "";
      // how to clear category to default?

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
  addRequest: function (first_name, last_name, email, subject, category, text) {
    Requests.insert({
      createdAt: new Date(),
      owner: first_name,
      last_name: last_name,
      email: email,
      subject: subject,
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
    console.log("Meteor is running.");
  });
}
