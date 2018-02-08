import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';

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
  systemUpdateDate: DS.attr('date'),

  //date transformers
  systemLoadDateFormatted: Ember.computed('systemLoadDate', {
    get() {
      return moment(this.get('systemLoadDate')).format('L');
    },
    set(key, val) {
      let value = val;
      if (val) {
        value = new Date(val);
      }
      this.set('systemLoadDate', value);
      return val;
    }
  })
});
