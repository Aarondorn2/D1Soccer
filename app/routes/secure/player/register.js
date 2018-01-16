import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  model() {
    return Ember.RSVP.hash({
      seasons: this.store.findAll('season'),
      user: this.store.peekRecord('user', this.get('session').userId),
      contracts: this.store.query('contract', { filter: { name: 'liabilityWaiverV1' } })
    });
  }
});
