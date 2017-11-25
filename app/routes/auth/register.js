import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    let session = this.get('session');

    if(!session.userId) { //if there is no user obect associated with session, go fetch it
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

    if(!session.userId) {
      if (model.content.length != 0) { //has an account already!
        session.userId = model.get("firstObject").id; //just use first record, shouldn't find multiple anyway

        this.transitionTo('secure.dashboard'); //try to send them to dashbord.  If not authenticated, will send to home page
      }
    }
  }
});
