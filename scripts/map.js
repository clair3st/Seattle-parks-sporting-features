(function(module) {

  var stylesArray = [
    {
      featureType: 'all',
      stylers: [
        { hue: '#00ffe6' },
        { saturation: -20 }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        { lightness: 100 },
        { visibility: 'simplified' }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];

  var mapOptions = {
    zoom: 12,
    styles: stylesArray,
    center: new google.maps.LatLng(47.6062, -122.3321),
    mapTypeId: google.maps.MapTypeId.STREET,
    scrollwheel: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    }
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  google.maps.event.addDomListener(window, 'load', function() {
    var input = document.getElementById('user-location');
    map.autocomplete = new google.maps.places.Autocomplete(input);
  });

  $('#user-form-button').on('click', function() {
    var userLocation = map.autocomplete.getPlace();
    marker = new google.maps.Marker({
      position: {
        lat: userLocation.geometry.location.lat(),
        lng: userLocation.geometry.location.lng()
      },
      map: map
    });
    marker.setMap(map);
  });


  module.map = map;
})(window);
