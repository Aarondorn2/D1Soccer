import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    let uid = this.get('session').get('uid');

    if(!uid) {
      uid = "noSoupForYou"; //if no uid, set to something that won't be found
    }

    return this.store.findRecord('user', uid).catch(() => {
      // no worries, handling in afterModel()
    });
  },

  afterModel(model) {
    if (model) { //has an account already!
      this.transitionTo('secure.dashboard'); //try to send them to dashbord.  If not authenticated, will send to home page
    }
  }
});
