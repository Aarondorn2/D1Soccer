import Ember from 'ember';

//make sure they're allowed to use this route
export default Ember.Route.extend({
  model() {
    return this.store.peekRecord('user', this.get('session').get('uid'));
  },

  afterModel(model) {
    if(!model.isAllowedPlayer) {
      this.transitionTo('secure.dashboard');
    }
  }
});
