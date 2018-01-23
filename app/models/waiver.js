import DS from 'ember-data';

export default DS.Model.extend({
  userSeason: DS.belongsTo('user-season'),
  contract: DS.belongsTo('contract'),
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
