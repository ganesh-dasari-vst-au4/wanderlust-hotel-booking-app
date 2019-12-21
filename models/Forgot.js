const forgotModel = {};

const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority";

forgotModel.search = function(email, callback) {
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
        email: email
      };

      var details = null;
      var accountSearch = database.collection("accounts");
      accountSearch.find(query).toArray(function(error, success) {
        details = success;

        if (details.length === 0) {
          return callback({
            status: false
          });
        } else {
          return callback(null, {
            status: true,
            route: "admin",
            success: success,
            message: "Found the email"
          });
        }
      });
    }
  );
};

module.exports = forgotModel;
