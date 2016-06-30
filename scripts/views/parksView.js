(function(module){
  var parkView = {};
  parkView.markers = [];

  parkView.toHtml = function (sport, scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).html());
    return template(sport);
  };

  parkView.renderIndexPage = function() {
    // $('#ajax-spinner').fadeOut();
    // $('#user-form-container').fadeIn();

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
        map: map
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
    var userLocation = map.autocomplete.getPlace();
    map.userLatLng = {
      lat: userLocation.geometry.location.lat(),
      lng: userLocation.geometry.location.lng()
    };
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
    $('#user-form').detach().appendTo($('#js-bootstrap-offcanvas'));
    $('#user-form-container').detach();
    var userAddress = document.getElementById('user-location').value;
    if (userAddress === '') {
      window.alert('You must enter an address.');
    } else {
      parkView.makeHomeMarker();
    }
    if($('#sport-filter').val()) {
      parkView.deleteMarkers();
      parkView.makeMarkers();
    }
  });

  module.parkView = parkView;

})(window);
