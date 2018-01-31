import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  isRegistrationOpen: false,
  currentSeason: null,
  userSeason: null,
  showLiabilityModal: false,
  contract: null,


  init() {
    this._super(...arguments);
    this.set('contract', this.get('contracts').get('firstObject'));

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
          }
        });

        //if nothing found, create one!
        if (!this.get('userSeason')) {
          let user = this.get('user');

          let userSeason = this.get('store').createRecord('user-season', {
                  user: user,
                  seasonId: this.get('currentSeason').id,
                  paymentId: '',
                  teamId: '',
                  hasPaid: false,
                  hasWaiver: false,
                  hasTeam: false,
                  systemLoadDate: new Date(),
                  systemUpdateDate: new Date()
                });
          userSeason.save();

          this.set('userSeason', userSeason); //set to new model
        }
      }
    });

  }, //init

  actions: {
    sendToMindBody() {
      var url = "https://clients.mindbodyonline.com/asp/main_shop.asp?studioid=881009&pMode=1&tabID=3&loc=1&trn=0&classid=0";

      window.open(url,"_blank"); // Open the url in a new tab/window. Set to "_self" instead of "_blank" to open in current window.
    },

    showWaiver() {
      Ember.$('#liability-modal').modal('show');
    },

    acceptLiabilityWaiver() {
      //build waiver obeject and persist
      let userSeason = this.get('userSeason');

      Ember.$.get("http://ipinfo.io", function(response) {

          let waiver = this.get('store').createRecord('waiver', {
                  userSeasonId: userSeason.id,
                  contractId: this.get('contract.id'),
                  acceptedName: this.get('user.fullName'),
                  acceptedEmail: this.get('user.email'),
                  acceptedIPAddress: response.ip,
                  hasAccepted: true,
                  acceptedDate: new Date(),
                  systemLoadDate: new Date()
                });

          waiver.save().then((response) => { //will update relationships on back end.
              userSeason.reload(); //get updated relationship
          });

      }.bind(this), "jsonp");
    }
  }

});
