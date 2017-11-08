import Ember from 'ember';

export default Ember.Component.extend({
classNameBindings: ['getClassNames'],
getClassNames: Ember.computed('isValid', function(){
      if(this.get('isValid')) {
        return 'is-valid is-valid-true';
      }
        return 'is-valid is-valid-false';
  })
});
