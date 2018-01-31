import Ember from 'ember';

//make sure they're allowed to use this route
export default Ember.Route.extend({
  model() {
    return this.store.peekRecord('user', this.get('session.currentUser').userId);
  },

  afterModel(model) {
    if(!model.get('isAllowedAdmin')) {
      this.transitionTo('secure.dashboard');
    }
  }
});
