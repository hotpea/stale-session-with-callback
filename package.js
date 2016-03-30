Package.describe({
  name:    'hotpea:stale-session-with-callback',
  summary: 'Stale session and session timeout handling with callback for [meteorjs](http://www.meteor.com/).',
  git:     "https://github.com/hotpea/stale-session-with-callback",
  version: "1.0.3"
});

Package.onUse(function(api) {
    api.use('accounts-base@1.0.0', ['client','server']);
    api.use('jquery@1.0.0', 'client');
    api.addFiles('client.js', 'client');
    api.addFiles('server.js', 'server');
});
