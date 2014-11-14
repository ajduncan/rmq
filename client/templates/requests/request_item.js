Template.requestItem.helpers({
	joinWithCategory: function() {
		var request = this;
		var category = Categories.findOne({_id: request.category});
		request.category_name = category.name;
		return request;
	}
});
