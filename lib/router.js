Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', function() {
  this.render('home');
});

Router.map(function() {
  this.route('requests', function() {
    this.render('listRequests', {
      data: function() {
        requests = Requests.find({});
        templateData = { requests: requests };
        return templateData;
      }
    });
  });

  this.route('/request/:_id', function() {
    this.render('updateRequest', {
      data: function() {
        return Requests.findOne({_id: this.params._id});
      }
    });
  });

});
