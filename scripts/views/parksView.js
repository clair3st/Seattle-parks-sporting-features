(function(module){
  var parkView = {};
  parkView.markers = [];

  parkView.toHtml = function (sport, scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).html());
    return template(sport);
  };

  parkView.renderIndexPage = function() {
    ParkData.allSportsArray.forEach(function(a) {
      if ($('#sport-filter option:contains("' + a.feature + '")').length === 0) {
        $('#sport-filter').append(parkView.toHtml(a, '#sports-filter-template'));
      }
    });
  };

  parkView.deleteMarkers = function() {
    for (var i = 0; i < parkView.markers.length; i++) {
      parkView.markers[i].setMap(null);
    }
    parkView.markers = [];
  };

  parkView.makeMarkers = function() {
    ParkData.allSportsArray.filter(function(a){
      return a.feature === $('#sport-filter').val();
    }).forEach(function(a) {
      markerSport = new google.maps.Marker({
        position: {lat: a.lng, lng: a.lat},
        map: map,
        animation: google.maps.Animation.DROP
      });
      parkView.markers.push(markerSport);
      markerSport.setIcon('img/' + a.feature + '.png');
      markerSport.addListener('click', function() {
        parkView.destination = new google.maps.LatLng(a.lng, a.lat);
        page('/park/'+a.id);
      });
    });
  };

  parkView.makeHomeMarker = function() {
    if (!map.autocomplete.getPlace()) {
      navigator.geolocation.getCurrentPosition(function(location) {
        map.userLatLng = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        };
      }, function(e) {
        map.userLatLng = {
          lat: 47.6062,
          lng: -122.3321
        };
        sweetAlert('Can\'t detect browser location', 'User location is defaulted to Seattle', 'warning');
      });
    } else {
      map.userLocation = map.autocomplete.getPlace();
      map.userLatLng = {
        lat: map.userLocation.geometry.location.lat(),
        lng: map.userLocation.geometry.location.lng()
      };
    }

    if (typeof markerHome !== 'undefined') {
      markerHome.setMap(null);
    }
    markerHome = new google.maps.Marker({
      position: map.userLatLng,
      map: map
    });
    markerHome.setIcon('img/home-icon.png');
    map.setCenter(map.userLatLng);
  };

//event listener for the main search button
  $('#user-form-button').on('click', function() {
    var userAddress = document.getElementById('user-location').value;
    if (userAddress === '') {
      sweetAlert('Oops...', 'User location not found!', 'error');
    } else {
      parkView.makeHomeMarker();
      page('/');
      $('#user-form').detach().appendTo($('#js-bootstrap-offcanvas'));
      $('#user-form-container').detach();
    }
    if($('#sport-filter').val()) {
      parkView.deleteMarkers();
      parkView.makeMarkers();
    }
    return false;
  });

  module.parkView = parkView;

})(window);
