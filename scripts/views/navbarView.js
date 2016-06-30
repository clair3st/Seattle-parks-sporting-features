(function(module){
  navbarView = {};

  navbarView.handleMenuClick = function() {
    $('nav a').on('click', function() {
      $('#js-bootstrap-offcanvas').trigger('offcanvas.close');
    });
  };

  navbarView.handleMenuClick();

  module.navbarView = navbarView;
})(window);
