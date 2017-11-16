import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  sortProperties: ['loadDt:desc'],
  sortedModel: Ember.computed.sort('model', 'sortProperties')
});
