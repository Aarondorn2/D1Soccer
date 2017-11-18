import Ember from 'ember';
const {Logger} = Ember;

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  router: Ember.inject.service(),
  session: Ember.inject.service(),
  email: "",
  resetEmail: "",
  password: "",
  isSendSuccess: false,
  isPasswordResetUnknownError: false,
  isPasswordResetBadEmailError: false,
  isPasswordResetSuccess: false,
  isPasswordResetFirstAttempt: Ember.computed('isPasswordResetUnknownError','isPasswordResetBadEmailError', 'isPasswordResetSuccess', function() {
    return !this.get('isPasswordResetUnknownError')
    && !this.get('isPasswordResetBadEmailError')
    && !this.get('isPasswordResetSuccess'); //if theres another message to display, this is false
  }),
  errorMessage: "",

  actions: {
    signIn: function(provider) {
      //debounce button
      Ember.$('#login-button').attr("disabled", true);

      let providerData = {provider: provider};

      if(provider === "password") {
        if(this.get('email') && this.get('password')) {
          providerData.email = this.get('email');
          providerData.password = this.get('password');
        } else {
          this.set('errorMessage', 'Please provide an email and password.');
          Ember.$('#login-button').attr("disabled", false);
          return;
        }
      } else if (provider === "google") {
        //set scopes
        providerData.settings = {
          scope: 'https://www.googleapis.com/auth/userinfo.email'
        };
      } else if (provider === "facebook") {
        //set scopes
        providerData.settings = {
          scope: 'email'
        };
      }

      this.get('session').open('firebase', providerData).then(
        function() { //success
          Ember.$('#login-modal').modal('hide');
          this.get('router').transitionTo('secure.dashboard');
        }.bind(this),
        function(error) { //fail
          switch (error.code) {
            case "auth/invalid-email":
            case "auth/user-not-found":
            case "auth/wrong-password":
              this.set('errorMessage', 'The email/password you provided are invalid.  Please try again.'); //TODO use alert-message instead
              break;
            default:
              this.set('errorMessage', 'An unknown error has occured.  Please try again later.');
              break;
          }
          Logger.error(error);
          Ember.$('#login-button').attr("disabled", false);
        }.bind(this)
      );

    },

    resetPassword: function() { //TODO captcha ,email validation
      let resetEmail = this.get('resetEmail');

      if(resetEmail) {
        //spin and debounce
        Ember.$('#reset-spinner').toggleClass('show').toggleClass('hide');
        Ember.$('#reset-button').attr("disabled", true);

        //reset flags
        this.set('isPasswordResetBadEmailError', false);
        this.set('isPasswordResetUnknownError', false);


        let auth = this.get('firebaseApp').auth();
        auth.sendPasswordResetEmail(resetEmail)
          .then(function() {
            this.set('isPasswordResetSuccess', true);
            this.set('resetEmail', '');
            Ember.$('#reset-button').attr("disabled", false);

          }.bind(this))
          .catch(function(error) {
            switch (error.code) {
              case "auth/invalid-email":
              case "auth/user-not-found":
                this.set('isPasswordResetBadEmailError', true);
                break;
              default:
                this.set('isPasswordResetUnknownError', true);
                break;
              }
            Logger.error(error);
            Ember.$('#reset-button').attr("disabled", false); //enable button so they can re-try
          }.bind(this));
      } else {
        this.set('isPasswordResetBadEmailError', true);
      }
      //remove spinner
      Ember.$('#reset-spinner').toggleClass('show').toggleClass('hide');
    },

    showEmail: function() {
      Ember.$('#login-email').toggleClass('show').toggleClass('hide');
    },

    showResetPassword: function() {
      Ember.$('#login-email').toggleClass('show').toggleClass('hide');
      Ember.$('#reset-password').toggleClass('show').toggleClass('hide');
    },

    submitLogin: function() {
      Ember.$('#login-button').click();
    },

    routeToRegister: function() {
      this.get('router').transitionTo('auth.register');
    }
  }
});
