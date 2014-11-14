Template.insertRequest.events({
  "submit #insertRequestForm": function (event) {
    // This function is called when the new request form is submitted

    var first_name = event.target.first_name.value;
    var last_name = event.target.last_name.value;
    var email = event.target.email.value;
    var subject = event.target.subject.value;
    var category = event.target.category.value;
    var description = event.target.description.value;

    Meteor.call("insertRequest", first_name, last_name, email, subject, category, description);

    // Clear form
    event.target.first_name.value = "";
    event.target.last_name.value = "";
    event.target.email.value = "";
    event.target.subject.value = "";
    event.target.description.value = "";
    // how to clear category to default?

    // Prevent default form submit
    return false;
  }
});
