import Ember from 'ember';
const {Logger} = Ember;

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  queryParams: Ember.inject.service('query-params'),
  router: Ember.inject.service(),
  session: Ember.inject.service(),

  resetEmail: "",
  resetOobCode: "",

  isInvalidCode: false,
  isUnknownError: false,
  isPasswordResetSuccess: false,

  password: "",
  passwordConfirm: "",

  isValidPasswordLength: Ember.computed.match('password', /^.{6,}$/),
  isValidPasswordCasing: Ember.computed.match('password', /(?=.*[a-z])(?=.*[A-Z])/),
  isValidPasswordAlphaNumeric: Ember.computed.match('password', /\d/),
  isValidPasswordMatch: Ember.computed('password','passwordConfirm', function() {
    return this.get('password') && (this.get('password') === this.get('passwordConfirm'));
  }),
  isValidPassword: Ember.computed.and('isValidPasswordLength', 'isValidPasswordCasing', 'isValidPasswordAlphaNumeric', 'isValidPasswordMatch'),

  isInvalidForm: Ember.computed.not('isValidPassword'),

  init() {
    this._super(...arguments);

    let oobCode = this.get('queryParams').get('oobCode');
    let auth = this.get('firebaseApp').auth();
    // Save the new password.
    auth.verifyPasswordResetCode(oobCode)
      .then((email) => {
        //set email/code. will be used on submittion of new password
        this.set('resetEmail', email);
        this.set('resetOobCode', oobCode);
      })
      .catch((error) => {
          //set email to empty - they'll need to try proccess again.
          this.set('resetEmail', '');

          if(error.code === "auth/invalid-action-code") {
            this.set('isInvalidCode', true);
          } else {
            this.set('isUnknownError', true);
          }
          Logger.error(error);
      });

  },

  actions: {
    sendToReset() {
      Ember.$('#login-modal').modal('show');
      Ember.$('#reset-password').toggleClass('show').toggleClass('hide');
    },

    resetPassword() {
      //spin and debounce
      Ember.$('#reset-spinner').toggleClass('show').toggleClass('hide');
      Ember.$('#reset-password').attr("disabled", true);

      let auth = this.get('firebaseApp').auth();
      auth.confirmPasswordReset(this.get('resetOobCode'), this.get('password'))
        .then(() => {
          //password reset has been confirmed and new password updated.
          //lets log them in directly instead of requiring them to enter information again
          let providerData = {
            provider: "password",
            email: this.get('resetEmail'),
            password: this.get('password')
          };

          this.get('session').open('firebase', providerData).then(
            function() { //success
              this.get('router').transitionTo('secure.dashboard');
            }.bind(this),
            function(error) { //fail
              //we're doing this without their knowledge - no need to let them know we failed. Send them to login
              Logger.error(error);
              this.get('router').transitionTo('auth.login');

            }.bind(this)
          );

        }).catch((error) => {
          //set email to empty - they'll need to try proccess again.
          this.set('resetEmail', '');

          if(error.code === "auth/invalid-action-code") {
            this.set('isInvalidCode', true);
          } else {
            this.set('isUnknownError', true);
          }
          Logger.error(error);
        });

      Ember.$('#reset-spinner').toggleClass('show').toggleClass('hide');
    }
  }
});
