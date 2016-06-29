(function(module){
  var parkView = {};

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
    console.log('append to filter');
  };

  module.parkView = parkView;

})(window);
