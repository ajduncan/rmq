Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', function() {
  this.render('home');
});

Router.map(function() {
  this.route('request', function() {
    this.render('listRequests', {
      data: function() {
        requests = Requests.find({});
        templateData = { requests: requests };
        return templateData;
      }
    });
  });

  this.route('updateRequest', {
    path: '/request/:_id',
    data: function() {
      return Requests.findOne({_id: this.params._id});
    }
  });

});
