(function(module){
  var homeController = {};

  homeController.index = function() {
    $('.tab-content').hide();
    $('#user-form-container').show();
    $('#map').show();
    navbarView.highlightTab('home');
    google.maps.event.trigger(map, 'resize');
    map.setCenter(map.userLatLng);
  };

  module.homeController = homeController;
})(window);
