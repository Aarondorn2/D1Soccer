import Ember from 'ember';

export default Ember.Component.extend({
  router: Ember.inject.service(),
  session: Ember.inject.service(),
  tagName: 'li',

    actions: {

      showLoginModal: function() {
        Ember.$('#login-modal').modal('show');
      },
      logout: function() {
        this.get("session").close();
        this.get('router').transitionTo('application');
      }
    }
});
