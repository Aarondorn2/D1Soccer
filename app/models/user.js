import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  dob: DS.attr('date'),
  shirtSize: DS.attr('string'),
  phone: DS.attr('string'),
  emergencyContact: DS.attr('string'),
  emergencyContactPhone: DS.attr('string'),
  userType: DS.attr('string'),
  email: DS.attr('string'),

  isAllowedPlayer: Ember.computed('userType', function() {
    let userType = this.get('userType');
    return userType === 'player' || userType === 'captain' || userType === 'admin';
  }),
  isAllowedCaptain: Ember.computed('userType', function() {
    let userType = this.get('userType');
    return userType === 'captain' || userType === 'admin';
  }),
  isAllowedAdmin: Ember.computed('userType', function() {
    return this.get('userType') === 'admin';
  })
});
