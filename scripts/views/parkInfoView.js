(function (module){

  var parkInfoView = {};

  parkInfoView.handleBack = function() {
    $('#back-link').on('click', function(){
      $('.tab-content').hide();
      $('#map').show();
      $('#user-form-container').show();
    });
  };


  ParkData.getAllSportsArray();


  parkInfoView.addMarkers = function() {
    var marker;
    ParkData.allSportsArray.forEach(function(a) {
      marker = new google.maps.Marker({
        position: {lat: a.lng, lng: a.lat},
        map: map
      });
      marker.addListener('click', function() {
        $('.tab-content').hide();
        $('#park-info').empty();
        $('#park-info').append(parkView.toHtml(a, '#park-template'));
        $('#park-info').show();
        parkInfoView.handleBack();
      });
    });
  };

  module.parkInfoView = parkInfoView;

})(window);
