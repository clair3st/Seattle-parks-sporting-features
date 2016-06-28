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
  map.userLatLng = mapOptions.center;

  google.maps.event.addDomListener(window, 'load', function() {
    var input = document.getElementById('user-location');
    map.autocomplete = new google.maps.places.Autocomplete(input);
  });

  $('#user-form-button').on('click', function() {
    var userLocation = map.autocomplete.getPlace();
    map.userLatLng = {
      lat: userLocation.geometry.location.lat(),
      lng: userLocation.geometry.location.lng()
    };
    if (typeof marker !== 'undefined') {
      marker.setMap(null);
    }
    marker = new google.maps.Marker({
      position: map.userLatLng,
      map: map
    });
    marker.setMap(map);
    map.setCenter(map.userLatLng);
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(map.userLatLng);
  });

  module.map = map;
})(window);
