import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  currentSeason: null,
  currentTeam: null,
  userSeason: null,
  waiverSigned: false,

  init() {
    this._super(...arguments);

    let seasons = this.get('seasons');
    let today = new Date();

    seasons.forEach((season) => {
      if(!this.get('currentSeason') && season.get('registrationStartDate') < today && season.get('registrationEndDate') > today) {
        this.set('isRegistrationOpen', true);
        this.set('currentSeason', season);

        //find user-season
        this.get('userSeasons').forEach((userSeason) => {
          if(!this.get('userSeason') && this.get('currentSeason').id === userSeason.get('seasonId')) {
            this.set('userSeason', userSeason);
            this.set('waiverSigned', userSeason.get('hasWaiver'));

            this.get('teams').forEach((team) => {
              if (team.id === userSeason.get('teamId')) {
                this.set('currentTeam', team);
              }
            });
          }
        });
      }
    });
  }, //init

  actions: {
      joinTeam(team) {
        let teamId = team.get('id');
        let userSeason = this.get('userSeason');
        userSeason.set('teamId', teamId);
        userSeason.save().then(() => { //will update relationships on back end.
            userSeason.reload(); //get updated relationship
            this.set('currentTeam', team);
        });
      }
  }

});
