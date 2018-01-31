import Ember from 'ember';

//this is our main secured route - we'll do any auth verification we need to here
//     *verify they have a User model stored in DB/session
//     *verify they've verified email if using 'password' provider
export default Ember.Route.extend({
  model() {
    let qEmail = this.get('session').get('currentUser').providerData[0].email;

    if(!qEmail) { //shouldn't get here
      qEmail = "noSoupForYou"; //if no email, set to something that won't be found
    }

    return this.store.query('user', { orderBy: 'email', equalTo: qEmail });
  },

  afterModel(model) {
    if (model.content.length == 0) { //no user... lets go register one!
        this.transitionTo('auth.register');
    } else {
        let session = this.get('session');
        if (session.get('provider') === "password" && !session.get('currentUser').emailVerified) {
          this.transitionTo('auth.verify-email');
        } else {
          //going to dashboard!  set userId on session
          session.get('currentUser').userId = model.get('firstObject').id;
        }
    }

  },

});
