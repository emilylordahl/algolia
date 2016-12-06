// node modules
var readline = require("readline");
var fs = require("fs");

var rest_json = "restaurants_list.json";
var rest_csv = "restaurants_info.csv";

var contents = fs.readFileSync(rest_json);
var jsonContent = JSON.parse(contents);

var rl = readline.createInterface({
  input: fs.createReadStream(rest_csv)
});

// Loop through each CSV line and add attrs to JSON
rl.on("line", function(line){
  tokens = line.split(";");

  // Find matching JSON obj by objectID
  var index = jsonContent.findIndex(function(item){
      return item.objectID === tokens[0];
  });

  // Get rid of header line and add the data if there's a match
  if (index > -1) {
    for (var i = 0; i < arrayFromRow.length; i++) {
      jsonContent[index][arrayFromRow[i]] = tokens[i];
    }
  }
});

rl.on("close", function(){
  fs.writeFile(rest_json + ".new", JSON.stringify(jsonContent), function(err){
      if (err) {
        console.log(err);
      }

      console.log("The file was saved to " + rest_json + ".new");
  })
});
