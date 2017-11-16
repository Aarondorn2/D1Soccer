import Service from '@ember/service';
import Ember from 'ember';

export default Service.extend({
  clientID: 'ebb66f2b1e4736a',
  baseAlbumURL: 'https://api.imgur.com/3/album/',
  defaultAlbumId: 'YEY2H',
  defaultAPIAction: '/images',

  //TODO: assign this to a variable to reduce API calls
  getAlbum(albumId = this.defaultAlbumId, action = this.defaultAPIAction) {
    return  Ember.$.ajax({
         url: this.baseAlbumURL + albumId + action,
         headers: { 'Authorization': 'Client-ID ' + this.clientID },
        //  data: { signature: authHeader },
         type: "GET"
      });
  }
});
