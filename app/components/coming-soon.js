import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    Ember.$('.footer').addClass('emptyPage');
  },
  willDestroyElement() {
    this._super(...arguments);
    Ember.$('.footer').removeClass('emptyPage');
  },
});
