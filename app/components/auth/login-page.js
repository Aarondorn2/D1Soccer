import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);

    Ember.$('#login-modal').modal('show');
    Ember.$('.footer').toggleClass('emptyPage');
  },
  willClearRender() {
    this._super(...arguments);

    Ember.$('#login-modal').modal('hide');
    Ember.$('.footer').toggleClass('emptyPage');
  },
  actions: {
    showSignin: function() {
      Ember.$('#login-modal').modal('show');
    }
  }
});
