import Ember from 'ember';
const {Logger} = Ember;

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch((error) => {
      Logger.warn(error);
    });
  },
  actions: {
    accessDenied: function() {
      this.transitionTo('login');
    }
  }
});
