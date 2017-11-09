import Ember from 'ember';
const {Logger} = Ember;

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  queryParams: Ember.inject.service('query-params'),

  isPasswordReset: false,
  resetEmail: "",
  resetOobCode: "",

  isInvalidCode: false,
  isUnknownError: false,

  init() {
    this._super(...arguments);

    //check to see if this is a callback
    let mode = this.get('queryParams').get('mode');
    if (mode && mode === 'resetPassword') {
        this.set('isPasswordReset', true);

        let oobCode = this.get('queryParams').get('oobCode');
        let auth = this.get('firebaseApp').auth();
        // Save the new password.
        auth.verifyPasswordResetCode(oobCode)
          .then((email) => {
            //set queryParams
            this.set('resetEmail', email);
            this.set('resetOobCode', oobCode);

            // TODO: https://firebase.google.com/docs/auth/custom-email-handler

          })
          .catch((error) => {
              if(error.code === "auth/invalid-action-code") {
                this.set('isInvalidCode', true);
              } else {
                this.set('isUnknownError', true);
              }
              Logger.error(error);
          });
    }
  },
  didRender() {
    this._super(...arguments);

    Ember.$('#login-modal').modal('show');
    Ember.$('.footer').toggleClass('emptyPage');
  },
  willClearRender() {
    this._super(...arguments);

    Ember.$('#login-modal').modal('hide');
    Ember.$('.footer').toggleClass('emptyPage');
  },
  actions: {
    showSignin: function() {
      Ember.$('#login-modal').modal('show');
    }
  }
});
