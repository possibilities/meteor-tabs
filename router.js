var TabRouter = Backbone.Router.extend({

  // Route everything through showTag(), it'll
  // know what to do
  initialize: function() {
    this.route(/([^\?]*)?/, 'showTab');
  },
  
  // Figures out the correct tab based on the
  // url and shows it
  showTab: function(page) {
    page || (page = this._defaultPage());
    $('.tabbable a[href="' + page + '"]').tab('show');
  },
  
  // Figure out the default tab
  _defaultPage: function() {
    var $default = $('.tabbable .default-tab a');
    if ($default.length > 0)
      return $default.attr('href');
    else {
      var $allTabs = $('.tabbable a');
      return $($allTabs.get(0)).attr('href');
    }
  }
});

var tabRouter = new TabRouter();

Meteor.startup(function() {
  Meteor.defer(function() {
    Backbone.history.start({ pushState: true });
  });
});
