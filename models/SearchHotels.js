const searchModel = {};
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority";

searchModel.hotelResults = function(city, callback) {
  var result;
  MongoClient.connect(
    url,
    {
      useUnifiedTopology: true
    },
    function(error, client) {
      if (error) {
        throw error;
      }
      var database = client.db("aloha");
      var query = {
        city: city
      };
      var hotelSearch = database.collection("hotels");
      hotelSearch.find(query).toArray(function(error, success) {
        if (error) {
          return callback(
            {
              status: false,
              message: "We dont serve in this city currently"
            },
            null
          );
        } else {
          result = success;
          return callback(null, {
            status: true,
            message: "success",
            result: result
          });
        }
      });
    }
  );
};

module.exports = searchModel;
