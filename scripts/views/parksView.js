(function(module){
  var parkView = {};

  parkView.toHtml = function (sport, scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
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

  // parkView.renderIndexPage();
  module.parkView = parkView;

})(window);
