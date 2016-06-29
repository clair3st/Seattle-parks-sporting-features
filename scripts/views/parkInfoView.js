(function (module){

  var parkInfoView = {};
  parkInfoView.markers = [];
  parkInfoView.destination;
  parkInfoView.origin;

  parkInfoView.handleBack = function() {
    $('#back-link').on('click', function(){
      $('.tab-content').hide();
      $('#map').show();
      $('#user-form-container').show();
    });
  };

  parkInfoView.handleDirections = function() {
    $('#directions-link').on('click', function(){
      $('.tab-content').hide();
      $('#map').show();
      parkInfoView.displayDirections();
      console.log('clicked');
    });
  };


  ParkData.getAllSportsArray();


  $('#user-form-button').on('click', function() {
    parkInfoView.userLocation = map.autocomplete.getPlace();
    map.userLatLng = {
      lat: parkInfoView.userLocation.geometry.location.lat(),
      lng: parkInfoView.userLocation.geometry.location.lng()
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


    if($('#sport-filter').val()){
      parkInfoView.deleteMarkers();
      ParkData.allSportsArray.filter(function(a){
        return a.feature === $('#sport-filter').val();
      }).forEach(function(a) {
        markerSport = new google.maps.Marker({
          position: {lat: a.lng, lng: a.lat},
          map: map
        });
        parkInfoView.markers.push(markerSport);
        markerSport.setIcon('img/' + a.feature + '.png');
        markerSport.addListener('click', function() {
          parkInfoView.destination = markerSport.position;
          $('.tab-content').hide();
          $('#park-info').empty();
          $('#park-info').append(parkView.toHtml(a, '#park-template'));
          $('#park-info').show();
          parkInfoView.handleBack();
          parkInfoView.handleDirections();
        });
      });

    }
  });

  parkInfoView.deleteMarkers = function() {
    for (var i = 0; i < parkInfoView.markers.length; i++) {
      parkInfoView.markers[i].setMap(null);
    }
    parkInfoView.markers = [];
  };

  parkInfoView.displayDirections = function() {
    var directionsService = new google.maps.DirectionsService;
    console.log(map.userLatLng.lat);
    directionsService.route({
      origin: [map.userLatLng.lat, map.userLatLng.lng],
      destination: [parkInfoView.destination.lat, parkInfoView.destination.lng],
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status){
      if (status === google.map.DirectionStatus.OK){
        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: map,
          directions: response,
          draggable: true,
          polylineOptions: {
            strokeColor: 'green'
          }
        });
      } else {
        window.alert('directions request failed due to ' + status);
      }
    });
  };

  module.parkInfoView = parkInfoView;

})(window);
