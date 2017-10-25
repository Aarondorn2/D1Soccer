import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
    imgur: Ember.inject.service(),

    model() {
      let album = this.get('imgur').getAlbum();
      return album;
    }
});
