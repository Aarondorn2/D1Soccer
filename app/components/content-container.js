import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({

  willRender() {
    Ember.$('html').addClass('page-bg').removeClass('main-bg'); //change background
  },
  willClearRender() {
      Ember.$('html').addClass('main-bg').removeClass('page-bg'); //change background
  }
});
