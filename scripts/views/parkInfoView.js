(function (module){

  var parkInfoView = {};

  parkInfoView.handleDirections = function() {
    $('#directions-link').on('click', function(){
      directionsMapInit(parkInfoView.displayDirections);
    });
  };

  parkInfoView.displayDirections = function(directionMap) {
    var directionsService = new google.maps.DirectionsService;
    directionsService.route({
      origin: new google.maps.LatLng(map.userLatLng.lat, map.userLatLng.lng),
      destination: parkView.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status){
      if (status === google.maps.DirectionsStatus.OK){
        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: directionsMap,
          directions: response,
          draggable: true,
          polylineOptions: {
            strokeColor: 'green'
          }
        });
        var infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent('<strong>' + response.routes[0].legs[0].distance.text + '</strong><br>' + response.routes[0].legs[0].duration.text + ' ');
        infoWindow.setPosition(response.routes[0].legs[0].end_location);
        infoWindow.open(directionsMap);
      } else {
        window.alert('directions request failed due to ' + status);
      }
    });
  };

//yet to be called, possibly could use later.
  parkInfoView.distanceToTravel = function(){
    var distanceMatrixService = new google.maps.DistanceMatrixService;
    var destinations = [];
    for (var i = 0; i < parkView.markers.length; i++) {
      destinations.push(parkView.markers[i].position);
    }
    var origin = new google.maps.LatLng(map.userLatLng.lat, map.userLatLng.lng);
    distanceMatrixService.getDistanceMatrix({
      origins: [origin],
      destinations: destinations,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    },
    function(response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        window.alert('Error was: ' + status);
      } else {
        parkInfoView.distances = response;
        console.log(response);
      }
    });;
  };

  module.parkInfoView = parkInfoView;

})(window);
