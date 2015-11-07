Package.describe({
  name: 'barbatus:ng2-meteor-accounts',
  version: '0.1.1',
  summary: 'Meteor Accounts for Angular2',
  git: 'https://github.com/barbatus/ng2-meteor-accounts',
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');

  api.use([
    'accounts-base@1.2.2',
    'promise@0.4.8',
    'barbatus:angular2@0.6.6'
  ]);

  api.addFiles([
    'typings/meteor-accounts.d.ts'
  ], 'server');

  api.addFiles([
    'accounts_service.ts',
    'annotations.ts',
    'main.ts',
    'system_config.js',
  ]);
});

Package.onTest(function(api) {
  api.use([
    'tinytest',
    'sanjo:jasmine@0.18.0',
    'barbatus:ng2-accounts-base'
  ]);
});
