const fs = require('fs');
const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const path = require('path');


const dirName = path.join(__dirname + '/csvFilesDir');
let url = "mongodb://127.0.0.1:27017/";

const parseCsvToJson = (file)=> {
  csvtojson()
.fromFile(path.join(__dirname + `/csvFilesDir/${file}`))
.then(csvData => {

  mongodb.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) throw err;

      client
        .db("random")
        .collection("users")
        .insertMany(csvData, (err, res) => {
          if (err) throw err;

          console.log(`Inserted: ${res.insertedCount} rows`);

        });
    }
  );
});
}


fs.readdir(dirName, (err, files)=> {
    if(err){
       throw err;
    }
    files.forEach((file)=> parseCsvToJson(file))
});
