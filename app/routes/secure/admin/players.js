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
      "propertyType": "text"
    },
    {
      "propertyName": "dob",
      "displayName": "DOB",
      "propertyType": "date",
      "propertyFormat": "ll",
      "propertyMask": "99/99/9999"
    },
    {
      "propertyName": "shirtSize",
      "displayName": "Shirt",
      "propertyType": "text"
    },
    {
      "propertyName": "phone",
      "displayName": "Phone",
      "propertyType": "text",
      // "propertyFormat": "ll", TODO
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
      "propertyType": "number",
      "propertyFormat": "(000) 000-0000", 
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
  model() {
    return this.store.findAll('user');
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('modelStructure', this.get('modelStructure'));
    controller.set('modelDefaults', this.get('modelDefaults'));
  }



});
