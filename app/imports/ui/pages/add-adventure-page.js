if (Meteor.isClient) {
  Template.map.onCreated(function () {
        GoogleMaps.ready('map', function (map) {
          var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance,
            animation: google.maps.Animation.DROP,
            draggable: true,
          });

          google.maps.event.addListener(map.instance, 'rightclick', function (event) {
                var addedMarker = new google.maps.Marker({
                  position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
                  map: GoogleMaps.maps.map.instance,
                  animation: google.maps.Animation.BOUNCE,
                  draggable: true,
                })
              }
          );
        });
      }
  );

  Meteor.startup(function () {
    GoogleMaps.load();
  });

  Template.map.helpers({
    mapOptions: function () {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(21.2969676, -157.821814),
          zoom: 9,
          mapTypeId: google.maps.MapTypeId.HYBRID,
        };
      }
    }
  });
}
