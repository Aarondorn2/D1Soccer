import Route from '@ember/routing/route';

export default Route.extend({
  modelStructure: [
    {
      "propertyName": "teamName",
      "displayName": "Team Name",
      "propertyType": "text"
    },
    {
      "propertyName": "userName",
      "displayName": "User Name",
      "propertyType": "text"
    },
    {
      "propertyName": "hasPaid",
      "displayName": "Marked Paid?",
      "propertyType": "select",
      "selectItems": [
        "True", "False"
      ]
    },
    {
      "propertyName": "hasWaiver",
      "displayName": "Signed Waiver?",
      "propertyType": "select",
      "selectItems": [
        "True", "False"
      ]
    },
    {
      "propertyName": "hasTeam",
      "displayName": "Joined Team?",
      "propertyType": "select",
      "selectItems": [
        "True", "False"
      ]
    },
    {
      "propertyName": "systemLoadDate",
      "displayName": "Register Date",
      "propertyType": "date",
      "propertyFormat": "ll", //using moment short-hand
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
    return this.store.query('userSeason', { filter: 'admin' });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('modelStructure', this.get('modelStructure'));
    controller.set('modelDefaults', this.get('modelDefaults'));
  }
});
