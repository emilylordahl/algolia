// Express
var express = require('express');
var app = express();
var logger = require('morgan');

// Algolia
var algoliasearch = require('algoliasearch');
var appID = process.env.ALGOLIA_APP_ID;
var apiKey = process.env.ALGOLIA_API_KEY;
var client = algoliasearch(appID, apiKey);
<<<<<<< HEAD
var index = client.initIndex('restaurant_data');
var restaurantsJSON = require('./resources/dataset/restaurant_list.json');
=======
var index = client.initIndex('restaurants');
var restaurantsJSON = require('./resources/dataset/restaurants_list.json');
>>>>>>> parent of cde0e25... Update 2016-12-06T05:50:29.868Z

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(express.static(__dirname + '/public'));

<<<<<<< HEAD
// Per docs, "it's better to do a setSettings before pushing the data"
index.setSettings({"attributesToIndex":["name", "food_type", "city", "neighborhood"]});
index.setSettings({"customRanking":["desc(reviews_count)", "desc(stars_count)"]});

index.addObjects(restaurantsJSON, function(err, content){
  if (err) {
    console.error(err);
  }
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Server running on port 3000...');
});
=======
index.addObjects(restaurantsJSON, function(err, content){
  if (err) {
    console.error(err);
  } else {
    console.log(content);
  }
});

index.setSettings({"attributesToIndex":["name", "price"]});

app.listen(process.env.PORT || 3000, function(){
  console.log('Server running on port 3000...');
});

client.listIndexes(function(err, content) {
  console.log(content);
});
>>>>>>> parent of cde0e25... Update 2016-12-06T05:50:29.868Z
