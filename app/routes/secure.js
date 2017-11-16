import Ember from 'ember';

//this is our main secured route - we'll do any auth verification we need ot here
//     *verify they have a User model stored in DB/session
//     *verify they've verified email if using 'password' provider
export default Ember.Route.extend({

  model() {
    let session = this.get('session');

    if(!session.userInfo) { //if there is no user info associated with session, go fetch it
      let currentUser = session.get('currentUser');
      let userEmail = "notfound@notfound.notfound";
      if(currentUser) { //should always have a session here, so currentUser should always be defined...
        userEmail = currentUser.providerData[0].email;
      }
      return this.store.query('user', { orderBy: 'email', equalTo: userEmail });
    }
  },

  afterModel(model) {
    let session = this.get('session');

    if(!session.userInfo) { //if there is no user info associated with session, add it is found, create it - else register

      if (model.content.length != 0) { //has an account already!
        let jsonModel = model.map(function (x) { return x.toJSON(); }); //don't want to associate Ember Data Model with session - just the data...
        session.userInfo = jsonModel[0]; //just use first record, shouldn't find multiple anyway
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
