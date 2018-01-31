import DS from 'ember-data';
import Ember from 'ember';
import ENV from 'd1soccer/config/environment';

export default DS.JSONAPIAdapter.extend({

  session: Ember.inject.service('session'),

  host: ENV.API.host,
  namespace: ENV.API.namespace,
  headers: Ember.computed('session', function() {

    //TODO more elegant token plz
    return {
      'Accept': 'application/vnd.app+json;version=1',
      'x-appid': 'd1soccer',
      'x-token': this.get('session.currentUser').Yd
    };
  })

});
//
// import FirebaseAdapter from 'emberfire/adapters/firebase';
//
// export default FirebaseAdapter.extend({
// });
