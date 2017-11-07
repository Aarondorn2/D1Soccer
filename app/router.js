import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('league', function() {
    this.route('information');
    this.route('news');
    this.route('schedule');
    this.route('standings');
  });
  this.route('album');
  this.route('contact');
  this.route('login');
  this.route('register');
  this.authenticatedRoute('secure', function() {
    this.route('admin', function() {
      this.route('announcement');
      this.route('event');
    });
  });

  this.route('secure', function() {
    this.route('dashboard');
  });

  this.route('leage', function() {});
});

export default Router;
