// Express
var express = require('express');
var app = express();
var logger = require('morgan');

// Algolia
var algoliasearch = require('algoliasearch');
var applicationID = process.env.ALGOLIA_APP_ID;
var apiKey = process.env.ALGOLIA_API_KEY;
var client = algoliasearch(applicationID, apiKey);
var index = client.initIndex('restaurants');
var restaurantsJSON = require('./resources/dataset/restaurants_list.json');

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(express.static(__dirname + '/public'));

index.addObjects(restaurantsJSON, function(err, content){
  if (err) {
    console.error(err);
  }
});

index.search('Pepper Pike', function searchDone(err, content) {
  console.log(content);
});


app.listen(process.env.PORT || 3000, function(){
  console.log('Server running on port 3000...');
});
