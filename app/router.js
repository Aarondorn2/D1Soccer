import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('secure', function() {
    this.route('admin', function() {
      this.route('announcement');
      this.route('event');
    });
  });
});

export default Router;
