var readline = require("readline");
var fs = require("fs");

var rest_json = "restaurants_list.json";
var rest_csv = "restaurants_info.csv";

var contents = fs.readFileSync(rest_json);

var jsonContent = JSON.parse(contents);

var rl = readline.createInterface({
  input: fs.createReadStream(rest_csv)
});

rl.on("line", function(line){
  tokens = line.split(";");

  var index = jsonContent.findIndex(function(item){
      return item.objectID == tokens[0];
  });

  if ( index > -1 ) {
    jsonContent[index].food_type = tokens[1];
    jsonContent[index].stars_count = tokens[2];
    jsonContent[index].reviews_count = tokens[3];
    jsonContent[index].neighborhood = tokens[4];
    jsonContent[index].phone_number = tokens[5];
    jsonContent[index].price_range = tokens[6];
    jsonContent[index].dining_style = tokens[7];
  }
});


rl.on("close", function(){
  fs.writeFile(rest_json + ".new", JSON.stringify(jsonContent), function(err){
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved to " + rest_json + ".new");
  });
});
