(function(module){
  var homeController = {};

  homeController.index = function() {
    $('.tab-content').hide();
    $('#user-form-container').fadeIn();
    $('#map').fadeIn();
  };

  module.homeController = homeController;
})(window);
