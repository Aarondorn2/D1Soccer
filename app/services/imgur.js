import Service from '@ember/service';

export default Service.extend({
  clientID: 'ebb66f2b1e4736a',
  baseAlbumURL: 'https://api.imgur.com/3/album/',
  defaultAlbumId: 'YEY2H',
  defaultAPIAction: '/images',

  getAlbum(albumId = this.defaultAlbumId, action = this.defaultAPIAction) {
    return  $.ajax({
         url: this.baseAlbumURL + albumId + action,
         headers: { 'Authorization': 'Client-ID ' + this.clientID },
        //  data: { signature: authHeader },
         type: "GET"
      });
  }
});
