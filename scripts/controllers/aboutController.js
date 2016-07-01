(function(module){
  var aboutController = {};

  aboutController.index = function() {
    $('.tab-content').hide();
    $('#about-page').fadeIn();
    navbarView.highlightTab('about');
  };

  module.aboutController = aboutController;
})(window);
