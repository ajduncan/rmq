Template.registerHelper("categoryOptions", function() {
  var options = [];
  options.push({label: 'please select', value: ''});
  Categories.find().forEach(function (element) {
    options.push({
      label: element.name, value: element._id._str
    })
  });
  return options;
});

Template.registerHelper("categoryEditOptions", function() {
  var options = [];
  options.push({label: 'please select', value: ''});
  Categories.find().forEach(function (element) {
  	if (element.name && element._id) {
	    options.push({
	      label: element.name, value: element._id
	    })
	}
  });  
  return options;
});
