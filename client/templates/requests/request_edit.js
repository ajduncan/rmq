AutoForm.addHooks('updateRequestForm', {
    onSuccess: function () {
        bootbox.alert('Request updated!');
    }
});
