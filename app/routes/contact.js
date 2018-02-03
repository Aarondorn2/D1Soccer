import Route from '@ember/routing/route';

export default Route.extend({

  activate: function() {
    this._super();
    window.scrollTo(0,0);
  },
  setupController: function(controller) {
    controller.setProperties({
      lat: 35.03489461, // Required
      lng: -85.14845471, // Required
      // lat: 35.035266,
      // lng: -85.149367,
      zoom: 16,
      mapType: 'hybrid', // Accepts 'roadmap', 'satellite', 'hybrid', or 'terrain'
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
            visible: false
          }
        }
      ]


    });
  }
});
