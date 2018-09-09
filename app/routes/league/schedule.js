import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
    imgur: Ember.inject.service(),

    model() {
      return this.get('imgur').getAlbum('zz4FIAr');
    }
});
