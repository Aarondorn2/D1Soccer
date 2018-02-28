import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
    model() {
      return Ember.RSVP.hash({
        teams: this.store.findAll('team'),
        rosters: this.store.findAll('captainRoster')
      });
    },
    afterModel(model) {
      let teams = model.teams.sortBy('teamName');
      let whitelistTeams = Array();
      model.rosters.mapBy('teamName').forEach((teamName) => {
        teams.forEach((team) => {
          if (team.get('teamName') == teamName || team.get('teamName') == "Free Agents") {
            whitelistTeams.push(team);
          }
        });
      });
      model.teams = whitelistTeams.uniqBy('teamName');
      model.rosters = model.rosters.sortBy('playerName');
    },

});
