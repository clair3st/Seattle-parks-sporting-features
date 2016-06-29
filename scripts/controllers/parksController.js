(function(module){
  var parksController = {};

  parksController.index = function(ctx, next) {
    parkInfoView.index(ctx.parks);
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
