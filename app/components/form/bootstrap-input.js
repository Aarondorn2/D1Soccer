import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-group'],

  isDropdown: Ember.computed('type', function() {
    return this.get('type') === "select";
  }),

  isCheckbox: Ember.computed('type', function() {
    return this.get('type') === "checkbox";
  })
});
