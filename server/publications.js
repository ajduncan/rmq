Meteor.publish('categories', function() {
  return Categories.find({});
});

Meteor.publish('requests', function() {
	return Requests.find({});
});