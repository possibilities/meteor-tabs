
Tabs = function(name, tabs) {
  this.name = name;
  this.tabContents = [];
  this.tabs = _.pairArrayItems(tabs, 'name', 'tabs');
  this._generateTemplateHelpers();
};

Tabs.prototype._generateTemplateHelpers = function() {
  var self = this;

  Handlebars.registerHelper(self.name, function() {
    var template = Template.tabs(self);
    return new Handlebars.SafeString(template);
  });
};

Tabs.prototype._render = function() {
  if (this._renderedTabs)
    return this._renderedTabs;
  else {
    var self = this;
    var tabs = _.map(self.tabs, function(tab) {
      return self._renderTabs(tab);
    });
    this._renderedTabs = tabs.join(' ');
    return this._renderedTabs;
  }
};

Tabs.prototype._configureTab = function(tab, parent) {
  tab.label = _.humanize(tab.name);
  tab.path = tab.name;

  if (parent && parent.name)
    tab.path = parent.name + '/' + tab.path;

  // TODO this is in more than one spot
  tab.target = _.camelize(tab.path.replace('/', '_'));

  return tab;
};

Tabs.prototype._configureTabContent = function(tab) {
  // Just add the tab name to the list, used by template
  this.tabContents.push(tab);
};

Tabs.prototype._renderTab = function(tab) {
  this._configureTabContent(tab);
  return Template.tab(tab);
};

Tabs.prototype._renderTabs = function(tabs) {
  var self = this;

  if (tabs.tabs) {
    var rawDropdown = _.pairArrayItems(tabs.tabs, 'name', 'tabs');
    tabs.tabs = _.map(rawDropdown, function(tab) {
      tab = self._configureTab(tab, tabs)
      self._configureTabContent(tab);
      return tab;
    });
    var dropdown = self._configureTab(tabs);
    return Template.dropdown(dropdown);
  } else {
    tabs = this._configureTab(tabs);
    return self._renderTab(tabs);
  }
};

_.mixin(_.str.exports());  

_.mixin({

  // TODO move this out into it's own library or a util lib
  // NOTE this is the most evolved version of this method
  pairArrayItems: function(rawList, keyName, arrayKeyName) {
    var list = [];
    _.each(rawList, function(stringOrObject, index) {
      var obj;
      if (_.isString(stringOrObject)) {
        var peek = rawList[index+1];
        if (_.isArray(peek)) {
          obj = {};
          arr = _.clone(peek);
          obj[keyName] = stringOrObject;
          obj[arrayKeyName] = arr;
          peek._merged = true;
        } else if (_.isObject(peek)) {
          obj = _.clone(peek);
          obj[keyName] = stringOrObject;
          peek._merged = true;
        } else {
          obj = {};
          obj[keyName] = stringOrObject;
        }
        list.push(obj);
      } else if (!stringOrObject._merged) {
        list.push(stringOrObject);
      }
    });
    return list;
  }
});

Template.tabs.tabs = function() {
  return new Handlebars.SafeString(this._render());
};

Template.tabs.events = {
  // Hook tabs into router
  'click .nav-tabs li a': function showTab(e) {
    e.preventDefault();
    var $el = $(e.currentTarget);
    if ($el.data('toggle') !== 'dropdown') {
      var route = $el.attr('href');
      tabRouter.navigate(route, { trigger: true });
    }
  }
};

Template.tabContents.tabBody = function() {
  var templateName = _.camelize(this.path.replace('/', '_'));
  var template = Template[templateName];
  if (!template)
    throw new Error("There is no template named '" + templateName + "'");
  var body = template();
  return new Handlebars.SafeString(body);
};
