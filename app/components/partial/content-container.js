import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({

  willRender() {
    if(this.get('theme') && this.get('theme') === "dark") {
      Ember.$('html').addClass('dark-bg').removeClass('main-bg'); //change background
    } else {
      Ember.$('html').addClass('page-bg').removeClass('main-bg'); //change background
    }
  },
  willClearRender() {
      Ember.$('html').addClass('main-bg') //change background back to main
      .removeClass('page-bg') //remove other backgrounds
      .removeClass('dark-bg');
  }
});
