Requests = new Mongo.Collection("requests");

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
  description: {
    type: String,
    label: "Description",
    max: 2000,
    optional: false,
    autoform: {
      style: "width: 90%"
    }
  },
  category: {
    type: Schemas.Categories._id,
    label: "Category",
    autoform: {
      style: "width: 90%"
    }
  }
});

Requests.attachSchema(Schemas.Request);

Meteor.methods({
  insertRequest: function (first_name, last_name, email, subject, category, description) {
    // How to override autoform if needed?
    /*
    Requests.insert({
      first_name: first_name,
      last_name: last_name,
      email: email,
      subject: subject,
      category: category,
      description: description
    });
    */
    /* createdAt: new Date(), */
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
  }
});
