import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    //fade out subheader
    Ember.$(window).scroll(() => {

      let scrollTop = Ember.$(window).scrollTop();
      // console.log(scrollTop);
      if(scrollTop >= 200) {
        Ember.$(".subheader h2").hide();
      } else {
        Ember.$(".subheader h2").show();

        if(scrollTop >= 100) {
          let op = 1 - ((scrollTop - 100) / 100);
          Ember.$(".subheader h2").css("opacity", op );
        } else {
          Ember.$(".subheader h2").css("opacity", 1 );
        }
      }

    });
  },
});
