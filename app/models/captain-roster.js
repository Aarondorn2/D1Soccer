import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  playerName: DS.attr('string'),
  teamId: DS.attr('string'),
  teamName: DS.attr('string'),
  hasPaid: DS.attr('boolean'),
  hasWaiver: DS.attr('boolean'),
  hasTeam: DS.attr('boolean'),
  shirtSize: DS.attr('string'),
  gender: DS.attr('string'),
  isKeeper: DS.attr('boolean'),
  isOffense: DS.attr('boolean'),
  isDefense: DS.attr('boolean'),

  positions: Ember.computed('isOffense', 'isDefense', 'isKeeper', function() {
    let positionArray = Array();
    if (this.get('isOffense')) {
      positionArray.push('Offense');
    }
    if (this.get('isDefense')) {
      positionArray.push('Defense');
    }
    if (this.get('isKeeper')) {
      positionArray.push('Keeper');
    }
    return positionArray.join(', ');
  }),
});
