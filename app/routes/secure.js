import Ember from 'ember';

//this is our main secured route - we'll do any auth verification we need to here
//     *verify they have a User model stored in DB/session
//     *verify they've verified email if using 'password' provider
export default Ember.Route.extend({
  model() {

    let session = this.get('session');
    if (session.get('provider') === "password" && !session.get('currentUser').emailVerified) {
      this.transitionTo('auth.verify-email');
    }

    let uid = session.get('uid');

    if(!uid) { //shouldn't get here
      uid = "noSoupForYou"; //if no uid, set to something that won't be found
    }

    return this.store.findRecord('user', uid).catch(() => {
      this.transitionTo('auth.register'); //no user in session or db... lets go register one!
    });
  }
});
