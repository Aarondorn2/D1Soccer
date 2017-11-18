import Ember from 'ember';

export default Ember.Component.extend({
  queryParams: Ember.inject.service('query-params'),

  isPasswordReset: "false",

  init() {
      this._super(...arguments);

      let mode = this.get('queryParams').get('mode');
      this.set('isPasswordReset', mode && mode === 'resetPassword');
  },
  didRender() {
    this._super(...arguments);

    if(!this.get('isPasswordReset')) { //if password reset, show that paenl - else login modal
      Ember.$('#login-modal').modal('show');
    }
  },
  willClearRender() {
    this._super(...arguments);

    Ember.$('#login-modal').modal('hide');
  },
  actions: {
    showSignin: function() {
      Ember.$('#login-modal').modal('show');
    }
  }
});
