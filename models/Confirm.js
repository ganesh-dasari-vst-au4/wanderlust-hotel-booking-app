const Confirm = {};
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority";

Confirm.book = function(userId, callback) {
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
        userId: userId
      };
      var bookDetails;
      var bookDetail;

      var collection = database.collection("history");
      collection.find(query).toArray(function(error, success) {
        if (error) {
          return callback({
            status: false,
            message: "Booking Failed"
          });
        } else {
          bookDetails = success;
          bookDetail = success[success.length - 1];
          return callback(null, {
            status: true,
            message: "Success",
            result: bookDetail
          });
        }
      });
    }
  );
};

module.exports = Confirm;
