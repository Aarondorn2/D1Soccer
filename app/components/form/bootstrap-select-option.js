import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'option',
  attributeBindings: ['value', 'selected'],
  value: Ember.computed('optionValue', function() {
    return this.get('optionValue');
  }),
  selected:  Ember.computed('value', 'selectValue', function() {
    return this.get('value') === this.get('selectedValue');
  })
});
