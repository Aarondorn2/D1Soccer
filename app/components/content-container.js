import Component from '@ember/component';

export default Component.extend({

  willRender() {
    $('html').addClass('page-bg').removeClass('main-bg'); //change background
  }
});
