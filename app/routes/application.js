import Ember from 'ember';
const {Logger} = Ember;

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch()
      .then(() => {
        Logger.warn(this.get('session')); //TODO: remove if not prod?
      })
      .catch((error) => {
        Logger.warn(error);
      });
  },
  actions: {
    accessDenied: function() {
      this.transitionTo('auth.login');
    }
  }
});
