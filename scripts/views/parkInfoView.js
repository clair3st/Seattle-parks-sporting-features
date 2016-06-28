// (function(module){
//
//   marker.addListener('click', function() {
//     $('.tab-content').hide();
//     $('#park-info').append(parkView.toHtml(this, '#park-template'));
//     $('#park-info').show();
//   });
//
//   module.parkInfoView = parkInfoView;
// })(window);
ParkData.getAllSportsArray();
var test = function(){
  ParkData.allSportsArray.forEach(function(a) {
    var marker = new google.maps.Marker({
      position: {lat: a.lng, lng: a.lat},
      map: map,
      title: a.name
    });

    console.log(a.name);
  });
};
