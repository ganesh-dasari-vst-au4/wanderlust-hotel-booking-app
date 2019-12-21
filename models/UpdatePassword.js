const UpdatePassword = {};

const MongoClient = require("mongodb").MongoClient;

var ObjectID = require("mongodb").ObjectID;
const url =
  "mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority";

UpdatePassword.update = function(email, password, callback) {
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
      var identifier = {
        email: email
      };
      var query = {
        password: password
      };
      var message;
      var collection = database.collection("accounts");
      collection.updateOne(identifier, { $set: query }, function(
        error,
        success
      ) {
        if (error) {
          console.log(error);
          return callback({ status: false, message: "Failed to update!!!" });
        }
        message = "Updated successfully!!!";
        console.log("Updated successfully!!!");
        return callback(null, {
          status: true,
          message: "Update successful!!!"
        });
      });
    }
  );
};
module.exports = UpdatePassword;
