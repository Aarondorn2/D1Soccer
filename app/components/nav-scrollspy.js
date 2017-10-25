
import Ember from 'ember';

export default Ember.Component.extend({

  // add scrollspy
  _addScrollSpy: Ember.on('didInsertElement', function() {
    $('body').scrollspy({
        target: '.section-nav'
    });
    $('#sidebar').affix({
    offset: {
        top: $('#sidebar').offset().top,
        bottom: ($('.footer').outerHeight(true) + 40)
    }
    });
  })
});
