import Route from '@ember/routing/route';

export default Route.extend({
  afterModel() {
    let currentUser = this.get('session').get('currentUser');

    if (currentUser && currentUser.emailVerified) {
        this.transitionTo('secure.dashboard');
    }

  }
});
