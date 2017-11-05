import Ember from 'ember';

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  tagName: 'li',

    actions: {

      showLoginModal: function() {
        Ember.$('#login-modal').modal('show');
      },
      logout: function() {
        this.get("session").close();
        this.get('routing').transitionTo('index');
      }
    }
});
