import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  loadDt: DS.attr('date', {defaultValue() { return new Date(); }})
});
