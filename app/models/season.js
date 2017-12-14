import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  registrationStartDate: DS.attr('date'),
  registrationEndDate: DS.attr('date'),
  systemLoadDate: DS.attr('date'),
  systemUpdateDate: DS.attr('date')
});
