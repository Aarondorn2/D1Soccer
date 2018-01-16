import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  waiver: DS.belongsTo('waiver'),
  seasonId: DS.attr('string'),
  paymentId: DS.attr('string'),
  teamId: DS.attr('string'),
  hasPaid: DS.attr('boolean'),
  hasWaiver: DS.attr('boolean'),
  hasTeam: DS.attr('boolean'),
  systemLoadDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
  systemUpdateDate: DS.attr('date')
});
