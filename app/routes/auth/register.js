import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    if(this.get('session.isAuthenticated')) { //if authenticated, check to see if user is set up
        let qEmail = this.get('session').get('currentUser').providerData[0].email;
        return this.store.query('user', { orderBy: 'email', equalTo: qEmail });
    }
  },

  afterModel(model) {
    if (model && model.content.length > 0) { //has an account already!
      this.transitionTo('secure.dashboard'); //try to send them to dashbord.  If not authenticated, will send to home page
    }
  }
});
