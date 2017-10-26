import Route from '@ember/routing/route';

export default Route.extend({

  setupController: function(controller) {
    controller.setProperties({
      lat: 32.75494243654723,
      lng: -86.8359375,
      zoom: 4,
    //   mapType: 'satellite', // Accepts 'roadmap', 'satellite', 'hybrid', or 'terrain'
    //   showMapTypeControl: true,
    //   clickableIcons: true,
    //   draggable: true,
    //   disableDefaultUI: false,
    //   disableDoubleClickZoom: false,
    //   scrollwheel: true,
    //   showZoomControl: true,
    //   showScaleControl: true
    //   markers: [
    //   {
    //     id: 'unique-marker-id',  // Recommended
    //     lat: 33.516674497188255, // Required
    //     lng: -86.80091857910156, // Required
    //     infoWindow: {
    //       content: '<p>Birmingham</p>',
    //       visible: true
    //     },
    //     click(event, marker) {},
    //     rightclick(event, marker) {},
    //     dblclick(event, marker) {},
    //     mouseover(event, marker) {},
    //     mouseout(event, marker) {},
    //     mouseup(event, marker) {},
    //     mousedown(event, marker) {},
    //     drag(e, marker) {},
    //     dragstart(e, marker) {},
    //     dragend(e, marker) {}
    //   }
    // ]
    });
  }
});
