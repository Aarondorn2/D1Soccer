import Ember from 'ember';
const {Logger} = Ember;

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  session: Ember.inject.service(),
  email: "",
  password: "",
  errorMessage: "",

  actions: {
    signIn: function(provider) {
      //set spinner

      let providerData = {provider: provider};

      if(provider === "password") {
        if(this.get('email') && this.get('password')) {
          providerData.email = this.get('email');
          providerData.password = this.get('password');
        } else {
          this.set('errorMessage', 'Please provide an email and password.');
          return;
        }
      }

      this.get('session').open('firebase', providerData).then(
        function() { //success
          Ember.$('#login-modal').modal('hide');
          this.get('routing').transitionTo('secure.dashboard');
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
        }.bind(this)
      );

    },

    showEmail: function() {
      Ember.$('#login-email').toggleClass('show').toggleClass('hide');
    },

    submitLogin: function() {
      Ember.$('#login-button').click();
    }
  }
});
