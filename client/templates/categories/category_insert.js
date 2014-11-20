Template.insertCategory.events({
  "submit #insertCategoryForm": function (event) {
    var name = event.target.name.value;

    Meteor.call("insertCategory", name);

    // Clear form
    event.target.name.value = "";

    // Prevent default form submit
    return false;
  }
});
