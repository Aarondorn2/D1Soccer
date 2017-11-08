import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    let session = this.get('session');

    if(!session.userInfo) { //if there is no user info associated with session, go fetch it
      let currentUser = session.get('currentUser');
      let userEmail = "notfound@notfound.notfound";

      if(currentUser) { //may not have a session - currentUser may not be defined
        userEmail = currentUser.providerData[0].email;
      }
      return this.store.query('user', { orderBy: 'email', equalTo: userEmail });
    }
  },
  afterModel(model) {
    let session = this.get('session');

    if(!session.userInfo) {
      if (model.content.length != 0) { //has an account already!
        let jsonModel = model.map(function (x) { return x.toJSON(); }); //don't want to associate Ember Data Model with session - just the data...
        session.userInfo = jsonModel[0]; //just use first record, shouldn't find multiple anyway

        this.transitionTo('secure.dashboard'); //try to send them to dashbord.  If not authenticated, will send to home page
      }
    }
  }
});
