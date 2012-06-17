Package.describe({
  summary: "TODO"
});

Package.on_use(function (api) {
  api.use('templating', 'client');
  api.use('backbone', 'client');

  api.add_files('vendor/underscore.strings.js', 'client');

  api.add_files('tabs.html', 'client');
  api.add_files('router.js', 'client');
  api.add_files('tabs.js', 'client');
});
