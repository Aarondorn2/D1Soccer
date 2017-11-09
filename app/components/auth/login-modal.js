import Ember from 'ember';
const {Logger} = Ember;

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  router: Ember.inject.service(),
  session: Ember.inject.service(),
  email: "",
  resetEmail: "",
  password: "",
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
              this.set('errorMessage', 'The email/password you provided are invalid.  Please try again.');
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

    resetPassword: function() {
      //spin and debounce
      let resetEmail = this.get('resetEmail');

      if(resetEmail) {
        Ember.$('#reset-spinner').toggleClass('show').toggleClass('hide');
        Ember.$('#reset-button').attr("disabled", true);

        let auth = this.get('firebaseApp').auth();
        auth.sendPasswordResetEmail(resetEmail).then(function() {
          // Email sent.
        }).catch(function(error) {
          // An error happened.
        });
      } else {
        //TODO validation instead?
      }
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
