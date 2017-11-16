import Ember from 'ember';

export default Ember.Component.extend({

  willRender() {
    switch(this.get('theme')) {
      case "dark":
        Ember.$('html').addClass('dark-bg').removeClass('main-bg'); //change background
        Ember.$('head').append('<link rel="stylesheet" type="text/css" id="theme-stylesheet" href="/assets/theme/bootstrap-slate.min.css">'); //add stylesheet
        break;
      default:
        Ember.$('html').addClass('page-bg').removeClass('main-bg'); //change background
        break;
    }
  },
  willClearRender() {
      Ember.$('html').addClass('main-bg') //change background back to main
      .removeClass('page-bg') //remove other backgrounds
      .removeClass('dark-bg');

      if (this.get('theme') && this.get('theme') === "dark") {
        Ember.$('#theme-stylesheet').remove(); //remove stylesheet
      }
  }
});
