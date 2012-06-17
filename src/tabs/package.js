Package.describe({
  summary: "Smart package for generating a tabbed interface"
});

Package.on_use(function (api) {

  // Dependencies
  api.use('templating', 'client');
  api.use('backbone', 'client');

  // Vendored
  api.add_files('vendor/underscore.strings.js', 'client');

  // Core
  api.add_files('tabs.html', 'client');
  api.add_files('router.js', 'client');
  api.add_files('tabs.js', 'client');
});
