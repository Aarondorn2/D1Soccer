import DS from 'ember-data';

export default DS.Model.extend({
    user: DS.belongsTo('user'),
    provider: DS.attr('string'),
    systemLoadDate: DS.attr('date', {
      defaultValue() { return new Date(); }
    })
});
