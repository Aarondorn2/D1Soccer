import Ember from 'ember';
//TODO can do this in route?
export default Ember.Component.extend({
    init() {
      this._super(...arguments);
      Ember.$('head').append('<link rel="stylesheet" type="text/css" id="theme-stylesheet" href="/assets/theme/bootstrap-slate.min.css">');
    },
    willClearRender() {
      this._super(...arguments);
      Ember.$('#theme-stylesheet').remove();
    }
});
