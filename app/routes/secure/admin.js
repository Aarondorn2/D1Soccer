import Ember from 'ember';

//make sure they're allowed to use this route
export default Ember.Route.extend({
  model() {
    return this.store.peekRecord('user-link', this.get('session').get('uid'));
  },

  afterModel(model) {
    if(!model.get('user').get('isAllowedAdmin')) {
      this.transitionTo('secure.dashboard');
    }
  }
});
