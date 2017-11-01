import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  email: "",
  password: "",


  actions: {
    signIn: function(provider) {
      let providerData = {provider: provider};

      if(provider === "password") {
        providerData.email = this.get('email');
        providerData.password = this.get('password');
      }

      this.get('session').open('firebase', providerData).then(function(data) {
        console.log(data.currentUser);
        //save data to session?
      });

    },

    signOut: function() {
      this.get('session').close();
    },

    showEmail: function() {
      Ember.$('#login-email').toggleClass('show').toggleClass('hide');
    }
  }
});
