Meteor.publish('getCategory', function(categoryId) {
  console.log('getCategory: ' + categoryId);
  // check(categoryId, Number);
  var c = Categories.findOne({_id: categoryId});
  console.log('got category: ' + c); 
  return c;
});

Meteor.publish('categories', function() {
  return Categories.find({});
});