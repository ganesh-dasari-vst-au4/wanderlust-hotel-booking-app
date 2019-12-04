const signupModel = {};
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority";

signupModel.signup = function(name, email, phoneNumber, password, callback) {
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
      var collection = database.collection("accounts");
      var check = {
        email: email
      };

      var data = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password
      };

      var details = null;
      var accountSearch = database.collection("accounts");
      accountSearch.find(check).toArray(function(error, success) {
        details = success;
        if (details.length === 0) {
          collection.insertOne(data, function(error, data) {
            if (error) {
              return callback("Signup Failed");
            } else {
              return callback(null, "Signup Success");
            }
          });
        } else {
          return callback(
            "You have entered an email address that already exists"
          );
        }
      });
    }
  );
};

module.exports = signupModel;
