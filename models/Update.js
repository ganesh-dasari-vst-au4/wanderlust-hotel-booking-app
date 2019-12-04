const updateModel = {};

const MongoClient = require("mongodb").MongoClient;

var ObjectID = require("mongodb").ObjectID;
const url =
  "mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority";

updateModel.edit = function(id, name, email, phoneNumber, password, callback) {
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
        _id: ObjectID(id)
      };
      var query = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password
      };
      var message;
      var collection = database.collection("accounts");
      collection.updateOne(identifier, { $set: query }, function(
        error,
        success
      ) {
        if (error) {
          return callback({ status: false, message: "Failed to update!!!" });
        } else {
          message = "Updated successfully!!!";
        }
      });
      collection.find(query).toArray(function(error, success) {
        if (error) {
          return callback({ status: false, message: "Failed to update!!!" });
        } else {
          return callback(null, {
            status: true,
            message: message,
            user: success
          });
        }
      });
    }
  );
};
module.exports = updateModel;
