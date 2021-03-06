/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'd1soccer',
    environment,
    rootURL: '/',
    locationType: 'auto',


    torii: {
      sessionServiceName: 'session'
    },

    googleMap: {
      apiKey: 'AIzaSyAA7J1woMp5Kn6ZMvg0fyJVIjq42v-0fTI'
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
      'font-src': "'self' fonts.gstatic.com",
      'connect-src': "'self' maps.gstatic.com",
      'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com"
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

      //point to -dev project
      ENV.firebase = {
        apiKey: 'AIzaSyBqOgivaTAgl8NfjKFfujNlkUnpCuHd5bI',
        authDomain: 'd1soccer-dev.firebaseapp.com',
        databaseURL: 'https://d1soccer-dev.firebaseio.com',
        storageBucket: 'd1soccer-dev.appspot.com',
        messagingSenderId: '650769926530'
      };
      ENV.API = {
        host: 'http://localhost3',
        namespace: 'app_dev.php'
      };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'stg') {

    //point to -stg project
    ENV.firebase = {
      apiKey: "AIzaSyC5XHtz5BDIsrSqH3SNqNMG4u6s_TbqLTA",
      authDomain: "d1soccer-stg.firebaseapp.com",
      databaseURL: "https://d1soccer-stg.firebaseio.com",
      projectId: "d1soccer-stg",
      storageBucket: "d1soccer-stg.appspot.com",
      messagingSenderId: "299942619453"
    };
    ENV.API = {
      host: 'http://localhost3',
      namespace: 'app.php'
    };
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature


      //point to -prod project
    ENV.firebase = {
      apiKey: 'AIzaSyDoyGAvZXzKl8I1pjdG7XVx8JKqDShgZVw',
      authDomain: 'd1chattsoccer.com',
      databaseURL: 'https://d1soccer-prod.firebaseio.com',
      projectId: "d1soccer-prod",
      storageBucket: 'd1soccer-prod.appspot.com',
      messagingSenderId: '124721056854'
    };
    ENV.API = {
      host: 'https://api.D1ChattSoccer.com',
      namespace: ''
    };
  }

  return ENV;
};
