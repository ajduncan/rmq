Template.insertRequest.helpers({
    categoryOptions: function() {
        var options = [];
        Categories.find({}).forEach(function(element) {
            options.push({
                label: element.name, value: element._id
            })
        });
        return options;
    }
});

AutoForm.addHooks('insertRequestForm', {
    onSuccess: function () {
        bootbox.alert('Request added!');
    }
});
