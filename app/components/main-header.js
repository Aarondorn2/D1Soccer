import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    showSignin: function() {
      Ember.$('#login-modal').modal('show');
    },
    logout: function() {
      this.get("session").close();
    }
  }
});
