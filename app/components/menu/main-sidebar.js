import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'nav',
    classNames: ['nav-sidebar', 'navbar', 'navbar-default'],

    router: Ember.inject.service()
});
