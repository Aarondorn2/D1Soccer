/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  'ember-font-awesome': {
    useScss: true
  },
  'ember-cli-bootstrap-sassy': {
    'glyphicons': false
  }

  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.


  //default datatable w/ bootstrap UI
  app.import('node_modules/datatables.net/js/jquery.dataTables.js');
  app.import('node_modules/datatables.net-bs/js/dataTables.bootstrap.js');
  app.import('node_modules/datatables.net-bs/css/dataTables.bootstrap.css');

  // //datatable responsive
  // app.import('node_modules/datatables.net-responsive/js/dataTables.responsive.min.js');
  // app.import('node_modules/datatables.net-responsive-bs/js/responsive.bootstrap.min.js');
  // app.import('node_modules/datatables.net-responsive-bs/css/responsive.bootstrap.min.css');

  return app.toTree();
};
