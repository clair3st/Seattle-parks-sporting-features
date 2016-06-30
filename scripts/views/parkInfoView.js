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
        sweetAlert('Oops...', 'Can\'t get start point, ' + status, 'error');
      }
    });
  };

  module.parkInfoView = parkInfoView;

})(window);
