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
      } else {
        window.alert('directions request failed due to ' + status);
      }
    });
  };

  module.parkInfoView = parkInfoView;

})(window);
