import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.attr('number'),
  userName: DS.attr('string'),
  waiverId: DS.attr('number'),
  seasonId: DS.attr('string'),
  paymentId: DS.attr('string'),
  teamId: DS.attr('string'),
  teamName: DS.attr('string'),
  hasPaid: DS.attr('boolean'),
  hasWaiver: DS.attr('boolean'),
  hasTeam: DS.attr('boolean'),
  systemLoadDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
  systemUpdateDate: DS.attr('date')
});
