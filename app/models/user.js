import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  userLinks: DS.hasMany('user-link'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  dob: DS.attr('date'),
  shirtSize: DS.attr('string'),
  gender: DS.attr('string'),
  isKeeper: DS.attr('boolean'),
  isOffense: DS.attr('boolean'),
  isDefense: DS.attr('boolean'),
  phone: DS.attr('string'),
  emergencyContact: DS.attr('string'),
  emergencyContactPhone: DS.attr('string'),
  userType: DS.attr('string'),
  email: DS.attr('string'),
  seasons: DS.hasMany('user-season'),
  systemLoadDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
  systemUpdateDate: DS.attr('date'),

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
  }),
  fullName: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  })
});
