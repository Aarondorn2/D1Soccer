import Ember from 'ember';

export default Ember.Component.extend({

  // add scrollspy
  _addScrollSpy: Ember.on('didInsertElement', function() {
    Ember.$('body').scrollspy({
        target: '.section-nav'
    });
    Ember.$('#sidebar').affix({
    offset: {
        top: Ember.$('#sidebar').offset().top,
        bottom: (Ember.$('.footer').outerHeight(true) + 40)
    }
    });
  })
});
