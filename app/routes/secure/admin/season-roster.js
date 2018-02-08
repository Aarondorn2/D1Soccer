import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  modelStructure: [
    {
      "propertyName": "teamName",
      "displayName": "Team Name",
      "propertyType": "select",
      "selectItems": []
    },
    {
      "propertyName": "userName",
      "displayName": "User Name",
      "propertyType": "text",
      "disabled": "true"
    },
    {
      "propertyName": "hasPaid",
      "displayName": "Marked Paid?",
      "propertyType": "select",
      "selectItems": [
        true, false
      ]
    },
    {
      "propertyName": "hasWaiver",
      "displayName": "Signed Waiver?",
      "propertyType": "text",
      "disabled": "true"
    },
    {
      "propertyName": "hasTeam",
      "displayName": "Joined Team?",
      "propertyType": "select",
      "selectItems": [
        true, false
      ]
    },
    {
      "propertyName": "systemLoadDateFormatted",
      "displayName": "Register Date",
      "propertyType": "date",
      "propertyFormat": "ll", //using moment short-hand
      "parseAsDate": true, //moment doesn't like non-ISO strings...
      "propertyMask": "99/99/9999"
    }
  ],
  modelDefaults: [ //TODO
    {
      "propertyName": "systemUpdateDate",
      "propertyType": "date",
      "propertyValue": new Date()
    },
  ],
  model() {
    return Ember.RSVP.hash({
      userSeasons: this.store.query('userSeason', { filter: 'admin' }),
      teams: this.store.findAll('team')
    });
  },
  afterModel(model) {
    // code stinkkkkkk
    if (this.get('modelStructure')[0].selectItems.length < 1) {
      let teams = Array("");
      model.teams.forEach((team) => {
        teams.push(team.get('teamName'));
      });
      this.get('modelStructure')[0].selectItems = teams;
    }
  },


  setupController(controller, model) {
    this._super(controller, model);
    controller.set('modelStructure', this.get('modelStructure'));
    controller.set('modelDefaults', this.get('modelDefaults'));
  }
});
