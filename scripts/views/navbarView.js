(function(module){
  navbarView = {};

  navbarView.handleMenuClick = function() {
    $('.navbar .navbar-offcanvas').on('click', 'a', function() {
      $('#js-bootstrap-offcanvas').trigger('offcanvas.close');
    });
  };

  navbarView.highlightTab = function(page) {
    $('nav ul>li>a').removeClass('active');
    $('nav ul>li>a[data-page="' + page +'"]').addClass('active');
  };

  navbarView.handleMenuClick();

  module.navbarView = navbarView;
})(window);
