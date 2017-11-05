import Ember from 'ember';

export default Ember.Route.extend({

    model() {
      return this.store.query('user', { filter: { email: "aarondorn2@gmail.com" } });
    },
  afterModel(model) {
    if (model.get('length') === 0) {
      this.transitionTo('register', { queryParams: { reason: 'noUser' }});
    }
  }
});
