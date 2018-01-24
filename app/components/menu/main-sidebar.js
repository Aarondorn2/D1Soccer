import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'nav',
    classNames: ['nav-sidebar', 'navbar', 'navbar-default'],

    router: Ember.inject.service(),

    actions: {
      showFullSidebar() {
        //toggle full sidebar
        Ember.$(".secure-wrapper .nav-sidebar").toggleClass("full-sidebar");
        //toggle <hr>
        Ember.$(".navbar-collapse-button hr").toggleClass("hide");

      }
    },
    init() {
      this._super(...arguments);
      this.set('user', this.get('model').user.get('firstObject'));
    }
});
