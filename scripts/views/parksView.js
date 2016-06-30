(function(module){
  var parkView = {};
  parkView.markers = [];
  parkView.uniqMarkerOptions = [];
  parkView.markerOptions = [];

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
    parkView.uniqMarkerOptions = [];
    parkView.markerOptions = [];
    for (var i = 0; i < parkView.markers.length; i++) {
      parkView.markers[i].setMap(null);
    }
    parkView.markers = [];

  };

  parkView.counter = function(array) {
    counts = {};
    array.forEach(function(a){
      return counts[a.address] = (counts[a.address] || 0) + 1;
    });
    array.forEach(function(a){
      a.addressCount = counts[a.address];
    });
  };

  parkView.makeMarkers = function() {
    ParkData.allSportsArray.filter(function(a) {
      return a.feature === $('#sport-filter').val();
    }).forEach(function(a, index) {
      markerSportOptions = {
        position: {lat: a.lng, lng: a.lat},
        map: map,
        address: a.address,
        icon: 'img/' + a.feature + '.png'
      };
      parkView.markerOptions.push(markerSportOptions);
      parkView.counter(parkView.markerOptions);
    });
    parkView.uniqMarkerOptions = parkView.removeDuplicates(parkView.markerOptions, 'address');
    parkView.uniqMarkerOptions.forEach(function(a){
      var markerSport = new google.maps.Marker(a);
      parkView.markers.push(markerSport);
      markerSport.addListener('click', function() {
        parkView.destination = new google.maps.LatLng(a.position.lat, a.position.lng);
        console.log(a.position.lng, a.position.lat);
        parkView.selectedMarker = this;
        page('/park/'+a.id);
      });
    });

  };

  parkView.removeDuplicates = function (arr, prop) {
    var newArr = [];
    var lookup  = {};
    for (var i in arr) {
      lookup[arr[i][prop]] = arr[i];
    }
    for (i in lookup) {
      newArr.push(lookup[i]);
    }
    return newArr;
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
