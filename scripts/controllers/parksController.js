(function(module){
  var parksController = {};

  parksController.index = function(ctx, next) {
    console.log(ctx.parks);
    parksController.showInfoPage(ctx.parks);
  };

  parksController.showInfoPage = function(parks) {
    $('.tab-content').hide();
    console.log(parks[0], 'park');
    $('#park-info').html(parkView.toHtml(parks[0], '#park-template'));
    $('#park-info').show();
    $('#feature-count').html('The number of facilities for this sport at this location is ' + parkView.selectedMarker.addressCount);
    parkInfoView.handleDirections();
  };

  parksController.loadById = function(ctx, next) {
    var parkCtxData = function(park){
      ctx.parks = park;
      console.log(park);
      next();
    };
    console.log(ctx.params.id);
    ParkData.findWhere('id', ctx.params.id, parkCtxData);
  };

  module.parksController = parksController;
})(window);
