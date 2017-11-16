import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  dob: DS.attr('date'),
  shirtSize: DS.attr('string'),
  phone: DS.attr('string'),
  emergencyContact: DS.attr('string'),
  emergencyContactPhone: DS.attr('string'),
  userType: DS.attr('string'),
  email: DS.attr('string')
});
