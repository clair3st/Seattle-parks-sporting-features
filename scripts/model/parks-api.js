'use strict';

(function(module) {

  var parkData = {};
  parkData.allParks = [];

  parkData.requestData = function() {
    $.get('https://data.seattle.gov/resource/64yg-jvpt.json')
    .done(function(data){
      parkData.allParks = data;
    });
  };

















  module.parkData = parkData;
})(window);
