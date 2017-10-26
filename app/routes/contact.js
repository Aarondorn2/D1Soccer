import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({

  setupController: function(controller) {
    controller.setProperties({
      lat: 35.035266,
      lng: -85.149367,
      zoom: 17,
      mapType: 'satellite', // Accepts 'roadmap', 'satellite', 'hybrid', or 'terrain'
      showMapTypeControl: true,
      clickableIcons: true,
      draggable: true,
      disableDefaultUI: false,
      disableDoubleClickZoom: false,
      scrollwheel: true,
      showZoomControl: true,
      showScaleControl: true,
      markers: [
        {
          id: 'D1 Chattanooga',  // Recommended
          lat: 35.03489461, // Required
          lng: -85.14845471, // Required
          infoWindow: {
            content: '<div style="text-align:center;"><h5>D1 Chattanooga</h5><p>7430 Commons Blvd, Chattanooga, TN 37421</p></div>',
            visible: true
          },
          click(event, marker) {},
          rightclick(event, marker) {},
          dblclick(event, marker) {},
          mouseover(event, marker) {},
          mouseout(event, marker) {},
          mouseup(event, marker) {},
          mousedown(event, marker) {},
          drag(e, marker) {},
          dragstart(e, marker) {},
          dragend(e, marker) {}
        }
      ]


    });
  }
});
