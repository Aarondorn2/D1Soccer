import Route from '@ember/routing/route';

export default Route.extend({
  modelStructure: [
    {
      "propertyName": "name",
      "displayName": "Name",
      "propertyType": "text",
      "columnWidth": "30%"
    },
    {
      "propertyName": "startDate",
      "displayName": "Start Date",
      "propertyType": "date",
      "propertyFormat": "ll", //using moment short-hand
      "propertyMask": "99/99/9999"
    },
    {
      "propertyName": "endDate",
      "displayName": "End Date",
      "propertyType": "date",
      "propertyFormat": "ll",
      "propertyMask": "99/99/9999"
    },
    {
      "propertyName": "registrationStartDate",
      "displayName": "Registration Start Date",
      "propertyType": "date",
      "propertyFormat": "ll",
      "propertyMask": "99/99/9999"
    },
    {
      "propertyName": "registrationEndDate",
      "displayName": "Registration End Date",
      "propertyType": "date",
      "propertyFormat": "ll",
      "propertyMask": "99/99/9999"
    }
  ],
  modelDefaults: [
    {
      "propertyName": "systemUpdateDate",
      "propertyType": "date",
      "propertyValue": new Date()
    },
  ],
  model() {
    return this.store.findAll('season');
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('modelStructure', this.get('modelStructure'));
    controller.set('modelDefaults', this.get('modelDefaults'));
  }

});
