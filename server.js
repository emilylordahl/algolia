var algoliasearch = require('algoliasearch');
var applicationID = process.env.ALGOLIA_APP_ID;
var apiKey = process.env.ALGOLIA_API_KEY;
var client = algoliasearch(applicationID, apiKey);
var index = client.initIndex('restaurants');
var restaurantsJSON = require('./resources/dataset/restaurants_list.json');

index.addObjects(restaurantsJSON, function(err, content){
  if (err) {
    console.error(err);
  }
});

index.search('Pepper Pike', function searchDone(err, content) {
  console.log(content);
});
