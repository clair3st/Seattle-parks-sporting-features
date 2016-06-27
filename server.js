var express = require('express'),
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();

var proxyParkApi = function(request, response) {
  console.log('routing seattleParks request for', request.params[0]);
  (requestProxy({
    url: 'https://data.seattle.gov/resource/' + request.params[0],
    headers: {Authorization: 'token ' + process.env.PARKS_TOKEN}
  }))(request, response);

};
app.get('/resource/*', proxyParkApi);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
