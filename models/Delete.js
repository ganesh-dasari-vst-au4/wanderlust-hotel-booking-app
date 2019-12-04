const deleteModel = {};
const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
const url =
  "mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority";

deleteModel.cancelBooking = function(id, callback) {
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
    var collection = database.collection("history");
    collection.deleteOne(query, function(error, success) {
      if (error) {
        return callback({
          status: false,
          message: "Cancellation failed"
        });
      } else {
        return callback(null, {
          status: true,
          message: "Booking Cancelled"
        });
      }
    });
  });
};

module.exports = deleteModel;
