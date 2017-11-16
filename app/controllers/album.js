import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  groupedImages: Ember.computed(function() {
        // collect model data
        let allImages= this.get('model.data');

        // group into arrays of up to 3 for layout
        let groupedImages = [];
        while(allImages.length){
            groupedImages.push(allImages.splice(0,3));
        }

        return groupedImages;
    })
});
