import Ember from 'ember';

export default Ember.Route.extend({

    model() {
      let currentUser = this.get('session').content.currentUser;
      let userEmail = "notfound@notfound.notfound";

      if(currentUser) { //should always have a session here, so currentUser should always be defined...
        userEmail = currentUser.email;
      }
      return this.store.query('user', { filter: { email: userEmail } });
    },
  afterModel(model) {
    if (model.get('length') === 0) { //doesn't have a user account
      this.transitionTo('register');
    }
  }
});
