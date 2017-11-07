import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    let currentUser = this.get('session').content.currentUser;
    let userEmail = "notfound@notfound.notfound";

    if(currentUser) { //may not have a session - currentUser may not be defined
      userEmail = currentUser.email;
    }
    return this.store.query('user', { filter: { email: userEmail } });
  },
  afterModel(model) {
    if (model.get('length') != 0) { //has an account already!
      this.transitionTo('secure.dashboard'); //try to send them to dashbord.  If not authenticated, will send to home page
    }
  }
});
