import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('auth', function() {
    this.route('login');
    this.route('register');
    this.route('verify-email');
  });
  this.route('league', function() {
    this.route('information');
    this.route('news');
    this.route('schedule');
    this.route('standings');
  });
  this.authenticatedRoute('secure', function() {
    this.route('dashboard');
    this.route('admin', function() {
      this.route('announcement');
      this.route('event');
    });
  });
  this.route('album');
  this.route('contact');


});

export default Router;
