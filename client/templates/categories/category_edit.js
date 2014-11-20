Template.updateCategory.events({
  "submit #updateCategoryForm": function (event) {
    bootbox.alert('Category updated.');
    // Prevent default form submit
    return true;

    var name = event.target.name.value;

/*
    Meteor.call('updateCategory', 
        category._id,
        category,
        function (error, result) {
            if (error) {
                alert(error)
            } else {
                bootbox.alert('Category updated');
            }
        }
    });
*/

  }
});
