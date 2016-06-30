(function(module) {

  function ParkData(opts){
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
      this.location = {
        lat: this.lat,
        lng: this.lng
      };
    },this);
  }
  ParkData.allParks = [];
  ParkData.allSportsArray = [];
  $('#user-form').hide();
  ParkData.createTable = function(next){
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS parks_database (' +
        'id INTEGER PRIMARY KEY, ' +
        'name VARCHAR NOT NULL, ' +
        'address VARCHAR NOT NULL, ' +
        'feature VARCHAR NOT NULL, ' +
        'hours VARCHAR, ' +
        'lat FLOAT NOT NULL, ' +
        'lng FLOAT NOT NULL, ' +
        'lighting BOOLEAN);',
        function() {
          console.log('successfully set up parks database table');
          ParkData.requestData();
        }
    );
  };

  ParkData.prototype.insertRecord = function (){
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO parks_database (name, address, feature, hours, lat, lng, lighting) VALUES (?, ?, ?, ?, ?, ?, ?);',
          'data': [this.name, this.location_1_address, this.feature_desc, this.hours, this.xpos, this.ypos, this.lighting]
        }
      ]
    );
  };

  ParkData.requestData = function() {
    webDB.execute('SELECT * FROM parks_database', function(rows) {
      if (rows.length) {
        ParkData.allParks = rows.map(function(ele) {
          return new ParkData(ele);
        });
        ParkData.updateRecord();
      } else {
        $.get('https://data.seattle.gov/resource/64yg-jvpt.json?$$app_token=TDroSLKHRDeFPJQ6CoJrXbMwJ&$limit=2000')
        .done(function(data){
          data.forEach(function(item){
            var parkObject = new ParkData(item);
            parkObject.insertRecord();
          });
          webDB.execute('SELECT * FROM parks_database', function(rows){
            ParkData.allParks = rows.map(function(ele) {
              return new ParkData(ele);
            });
          });
          ParkData.updateRecord();
        });
      }
    });
  };

  ParkData.getAllSportsArray = function() {
    $('#ajax-spinner').fadeOut();
    $('#user-form').fadeIn();

    webDB.execute('SELECT * FROM parks_database WHERE feature LIKE "%ball%" ' +
    'OR feature LIKE "cricket" ' +
    'OR feature LIKE "disc%" ' +
    'OR feature LIKE "lacrosse" ' +
    'OR feature LIKE "Pool%" ' +
    'OR feature LIKE "rugby" ' +
    'OR feature LIKE "soccer" ' +
    'OR feature LIKE "tennis%" ' +
    'OR feature LIKE "zipline"' +
    'ORDER BY feature ASC' +
    ';',
    function(rows) {
      ParkData.allSportsArray = rows.map(function(ele) {
        return new ParkData(ele);
      });
      parkView.renderIndexPage();
    });
  };

  ParkData.truncateTable = function() {
    webDB.execute('DELETE FROM parks_database');
  };

  ParkData.updateRecord = function() {
    webDB.execute('UPDATE parks_database SET address = "9220 14th Ave NW", lat = -122.3740796, lng = 47.6966073 WHERE name = "Crown Hill Park"', function(){
      webDB.execute('UPDATE parks_database SET hours = "4 a.m. - 11:30 p.m." WHERE name = "Discovery Park"', function() {
        webDB.execute('UPDATE parks_database SET feature = "Softball and Baseball" WHERE feature = "Baseball/Softball"', function(){
          ParkData.getAllSportsArray();
        });
      });
    });
  };

  ParkData.findWhere = function(field, value, callback) {
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM parks_database WHERE ' + field + ' = ?;',
          data: [value]
        }
      ],
      callback
    );
  };

  // ParkData.allSports = function() {
  //   return ParkData.allSportsArray.map(function(obj) {
  //     return obj.feature;
  //
  //   })
  //   .reduce(function(uniqueSports, sport) {
  //     if (uniqueSports.indexOf(sport) === -1) {
  //       uniqueSports.push(sport);
  //     }
  //     return ParkData.uniqueSports = uniqueSports;
  //
  //   }, []);
  // };














  ParkData.createTable();



  module.ParkData = ParkData;
})(window);
