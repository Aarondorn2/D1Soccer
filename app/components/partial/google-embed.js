import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);

    //this handles xss issue so that second call succeeds.
    //this is hacky, but standings/schedule will be internal not spreadsheet) eventually.
    Ember.$.ajax({
      type: 'GET',
      url: this.get('url'),
      dataType: "text/html",
      xhrFields: {
          withCredentials: true
      }});

    Ember.$( "#google-embed" ).load( this.get('url') );

  },
});
