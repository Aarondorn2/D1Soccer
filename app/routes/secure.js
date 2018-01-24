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
    let qEmail = session.get('currentUser').providerData[0].email;

    if(!uid) { //shouldn't get here
      uid = "noSoupForYou"; //if no uid, set to something that won't be found
    }
    if(!qEmail) { //shouldn't get here
      qEmail = "noSoupForYou"; //if no email, set to something that won't be found
    }

    return Ember.RSVP.hash({
      userLink: this.store.findRecord('user-link', uid).catch(() => {
        //handling in afterModel
      }),
      user: this.store.query('user', { orderBy: 'email', equalTo: qEmail })
    });
  },

  afterModel(model) {
    if (!model.userLink && model.user.content.length > 0) { //no link to user - create one!
      let session = this.get('session');
      let userLink = this.get('store').createRecord('user-link');
        userLink.set('id', session.get('uid'));
        userLink.set('provider', session.get('provider'));
        userLink.set('user', model.user.get('firstObject'));

        model.user.get('firstObject').get('userLinks').pushObject(userLink);
        userLink.save().then(() => {
          model.user.save();
      });
    }
    else if (model.user.content.length == 0) { //no user... lets go register one!
        this.transitionTo('auth.register');
    }
  },

});
