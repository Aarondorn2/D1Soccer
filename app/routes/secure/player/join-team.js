import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({

    model() {
      let userId = this.get('session.currentUser').userId;
      return Ember.RSVP.hash({
        seasons: this.store.findAll('season'),
        user: this.store.peekRecord('user', userId),
        userSeasons: this.store.findAll('userSeason'),
        teams: this.store.findAll('team')
      });
    }
});
