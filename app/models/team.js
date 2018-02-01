import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  captainFirstName: DS.attr('string'),
  captainLastName: DS.attr('string'),
  teamName: DS.attr('string'),
  teamColor: DS.attr('string'),


  captainFullName: Ember.computed('firstName', 'lastName', function() {
    return this.get('captainFirstName') + ' ' + this.get('captainLastName');
  })
});
