import DS from 'ember-data';

export default DS.Model.extend({
  userSeasonId: DS.attr('number'),
  contractId: DS.attr('number'),
  acceptedName: DS.attr('string'),
  acceptedEmail: DS.attr('string'),
  acceptedIPAddress: DS.attr('string'),
  hasAccepted: DS.attr('boolean'),
  acceptedDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
  systemLoadDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  })
});
