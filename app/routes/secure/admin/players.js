import Route from '@ember/routing/route';

export default Route.extend({
  modelStructure: [
    {
      "propertyName": "firstName",
      "displayName": "First Name",
      "propertyType": "text"
    },
    {
      "propertyName": "lastName",
      "displayName": "Last Name",
      "propertyType": "text"
    },
    {
      "propertyName": "email",
      "displayName": "Email",
      "propertyType": "text"
    },
    {
      "propertyName": "userType",
      "displayName": "User Type",
      "propertyType": "select",
      "selectItems": [
        "player", "captain", "admin"
      ]
    },
    {
      "propertyName": "dobFormatted",
      "displayName": "DOB",
      "propertyType": "date",
      "propertyFormat": "ll",
      "parseAsDate": true, //moment doesn't like non-ISO strings... 
      "propertyMask": "99/99/9999"
    },
    {
      "propertyName": "shirtSize",
      "displayName": "Shirt",
      "propertyType": "select",
      "selectItems": [
        "None", "S", "M", "L", "XL", "XXL"
      ]
    },
    {
      "propertyName": "phone",
      "displayName": "Phone",
      "propertyType": "text",
      "propertyFormat": "custom::(%%%) %%%-%%%%",
      "propertyMask": "(999) 999-9999"
    },
    {
      "propertyName": "emergencyContact",
      "displayName": "Emerg. Contact",
      "propertyType": "text"
    },
    {
      "propertyName": "emergencyContactPhone",
      "displayName": "Emerg. Phone",
      "propertyType": "text",
      "propertyFormat": "custom::(%%%) %%%-%%%%",
      "propertyMask": "(999) 999-9999"
    }
  ],
  modelDefaults: [
    {
      "propertyName": "systemUpdateDate",
      "propertyType": "date",
      "propertyValue": new Date()
    },
  ],
  sortOrder: [[ 0, "asc" ],[1, "asc"]],

  model() {
    return this.store.findAll('user');
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('modelStructure', this.get('modelStructure'));
    controller.set('modelDefaults', this.get('modelDefaults'));
    controller.set('sortOrder', this.get('sortOrder'));
  }



});
