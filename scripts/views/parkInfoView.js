(function (module){

  var parkInfoView = {};
  parkInfoView.markers = [];

  parkInfoView.handleBack = function() {
    $('#back-link').on('click', function(){
      $('.tab-content').hide();
      $('#map').show();
      $('#user-form-container').show();
    });
  };


  ParkData.getAllSportsArray();


  $('#user-form-button').on('click', function() {
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
          $('.tab-content').hide();
          $('#park-info').empty();
          $('#park-info').append(parkView.toHtml(a, '#park-template'));
          $('#park-info').show();
          parkInfoView.handleBack();
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

  module.parkInfoView = parkInfoView;

})(window);
