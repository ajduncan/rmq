Template.listRequests.helpers({
  'requests': function() {
    return Requests.find({}, {
      transform: function(doc) {
        Meteor.subscribe('getCategory', doc.category);
      }
    });
  },
  'category': function() {
    console.log('xxx' + this.category);
    var c = Categories.findOne(this.category); 
    return c;
  }
});
