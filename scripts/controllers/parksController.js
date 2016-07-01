(function(module){
  var parksController = {};

  parksController.index = function(ctx, next) {
    parksController.showInfoPage(ctx.parks);
  };

  parksController.showInfoPage = function(parks) {
    $('.tab-content').hide();
    $('#park-info').html(parkView.toHtml(parks[0], '#park-template'));
    $('#park-info').show();
    $('#feature-count').html('The number of facilities for this sport at this location is ' + parkView.selectedMarker.addressCount + '.');
    parkInfoView.handleDirections();
  };

  parksController.loadById = function(ctx, next) {
    var parkCtxData = function(park){
      ctx.parks = park;
      next();
    };
    ParkData.findWhere('id', ctx.params.id, parkCtxData);
  };

  module.parksController = parksController;
})(window);
