(function(module){
  var parkView = {};

  parkView.filterHtml= function (sport, scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
    return template(sport);
  };

  parkView.renderIndexPage = function() {
    ParkData.allSportsArray.forEach(function(a) {
      if ($('#sport-filter option:contains("' + a.feature + '")').length === 0) {
        $('#sport-filter').append(parkView.filterHtml(a, '#sports-filter-template'));
      }
    });
    console.log('append to filter');
  };

  // parkView.renderIndexPage();
  module.parkView = parkView;

})(window);
