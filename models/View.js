const View = {};
const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
const url =
  "mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority";

View.show = function(id, callback) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(
    error,
    client
  ) {
    if (error) {
      throw error;
    }
    var database = client.db("aloha");
    var query = {
      _id: ObjectID(id)
    };
    var result;
    var collection = database.collection("history");
    collection.find(query).toArray(function(error, success) {
      if (error) {
        return callback({
          status: false,
          message: "Failed to view"
        });
      } else {
        result = success[0];
        console.log("hi", success);
        return callback(null, {
          status: true,
          message: "Success",
          result: result
        });
      }
    });
  });
};

module.exports = View;
