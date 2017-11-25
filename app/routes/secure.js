import Ember from 'ember';

//this is our main secured route - we'll do any auth verification we need to here
//     *verify they have a User model stored in DB/session
//     *verify they've verified email if using 'password' provider
export default Ember.Route.extend({
  model() {
    let session = this.get('session');

    if(!session.userId) { //if there is no user obect associated with session, go fetch it
      let currentAuthUser = session.get('currentUser');
      let userEmail = "notfound@notfound.notfound";
      if(currentAuthUser) { //should always have a session here, so currentUser should always be defined...
        userEmail = currentAuthUser.providerData[0].email;
      }
      return this.store.query('user', { orderBy: 'email', equalTo: userEmail });
    }
  },

  afterModel(model) {
    let session = this.get('session');

    if(!session.userId) { //if there is no user info associated with session, and it is found, create it - else register

      if (model.content.length != 0) { //has an account already!
        session.userId = model.get("firstObject").id; //just use first record, shouldn't find multiple anyway
      }
      else { //no user in session or db... lets go register one!
        this.transitionTo('auth.register');
      }
    }

    if (session.get('provider') === "password" && !session.get('currentUser').emailVerified) {
      this.transitionTo('auth.verify-email');
    }

  }
});
