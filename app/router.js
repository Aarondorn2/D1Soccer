import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('league', function() {
    this.route('rules');
    this.route('news');
    this.route('schedule');
    this.route('standings');
  });
  this.route('album');
  this.route('contact');

  this.route('auth', function() {
    this.route('login');
    this.route('register');
    this.route('verify-email');
  });

  this.authenticatedRoute('secure', function() {
    this.route('dashboard');
    this.route('profile');

    this.route('player', function() {
      this.route('register');
      this.route('join-team');
    });

    this.route('captain', function() {
      this.route('preferences');
      this.route('roster');
    });

    this.route('admin', function() {
      this.route('standings');
      this.route('schedule');
      this.route('announcements');
      this.route('players');
      this.route('season-management');
      this.route('season-roster');
    });
  });
  this.route('gencontract');

});

export default Router;
