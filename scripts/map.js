(function(module) {

  var stylesArray = [
    {
      'featureType': 'administrative',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'lightness': 33
        }
      ]
    },
    {
      'featureType': 'landscape',
      'elementType': 'all',
      'stylers': [
        {
          'color': '#f2e5d4'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#c5dac6'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'lightness': 20
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'all',
      'stylers': [
        {
          'lightness': 20
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#c5c6c6'
        }
      ]
    },
    {
      'featureType': 'road.arterial',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#e4d7c6'
        }
      ]
    },
    {
      'featureType': 'road.local',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#fbfaf7'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'color': '#acbcc9'
        }
      ]
    },
    {
      'featureType': 'transit',
      'elementType': 'labels.text',
      'stylers': [
        {'visibility': 'off'}
      ]
    },
    {
      'featureType': 'transit.line',
      'elementType': 'geometry',
      'stylers': [
        {'visibility': 'off'}
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
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  map.userLatLng = mapOptions.center;


  google.maps.event.addDomListener(window, 'load', function() {
    var input = document.getElementById('user-location');
    map.autocomplete = new google.maps.places.Autocomplete(input);
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(map.userLatLng);
  });


  var directionsMapInit = function (callback) {
    var directionsMap = new google.maps.Map(document.getElementById('direction-map'), mapOptions);
    module.directionsMap = directionsMap;
    google.maps.event.addDomListener(window, 'resize', function() {
      directionsMap.setCenter(map.userLatLng);
    });
    callback(directionsMap);
  };

  map.parkAddressMapInit = function(park) {
    var parkMapOptions = {
      zoom: 12,
      styles: stylesArray,
      center: new google.maps.LatLng(park.lng, park.lat),
      mapTypeId: google.maps.MapTypeId.STREET,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      }
    };

    var parkAddressMap = new google.maps.Map(document.getElementById('direction-map'), parkMapOptions);
    var parkAddressMarker = new google.maps.Marker({
      position: parkMapOptions.center,
      map: parkAddressMap,
      title: park.name
    });
    var infowindow = new google.maps.InfoWindow({
      content: '<p>' + park.address + '</p>'
    });
    infowindow.open(parkAddressMap, parkAddressMarker);
    google.maps.event.addDomListener(window, 'resize', function() {
      parkAddressMap.setCenter(parkMapOptions.center);
    });
  };

  module.map = map;
  module.directionsMapInit = directionsMapInit;

})(window);
