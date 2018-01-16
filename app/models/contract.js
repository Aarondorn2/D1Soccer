import DS from 'ember-data';

export default DS.Model.extend({
  waivers: DS.hasMany('waiver'),
  contractName: DS.attr('string'),
  contractDisplayName: DS.attr('string'),
  contractText: DS.attr('string'),
  contractValidStartDate: DS.attr('date'),
  contractValidEndDate: DS.attr('date'),
  systemLoadDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  })

});
