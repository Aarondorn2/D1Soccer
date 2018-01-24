import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  model() {
    return Ember.RSVP.hash({
      seasons: this.store.findAll('season'),
      users: this.store.query('user', { orderBy: 'email', equalTo: this.get('session').get('currentUser').providerData[0].email }),
      contracts: this.store.query('contract', { filter: { name: 'liabilityWaiverV1' } }) //TODO dynamic
    });
  }
});
