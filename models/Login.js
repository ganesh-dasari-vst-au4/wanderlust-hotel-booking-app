const loginModel = {};
var admin = [{
  a_email: "ganesh@gmail.com",
  a_password: "manoj"
}];
const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority';

loginModel.login = function (email, password, callback) {
  MongoClient.connect(
    url, {
      useUnifiedTopology: true
    },
    function (error, client) {
      if (error) {
        throw error;
      }
      var database = client.db("aloha");
      var query = {
        email: email,
        password: password
      };

      var checkemail = admin.findIndex(x => x.a_email === email);
      var checkpassword = admin.findIndex(x => x.a_password === password);
      var details = null;
      var accountSearch = database.collection("accounts");
      accountSearch.find(query).toArray(function (error, success) {
        details = success;
        if (details.length === 0) {
          return callback({
            status: false
          });
        }
        if (checkemail === -1 && checkpassword === -1) {
          return callback(null, {
            status: true,
            route: "home",
            success: success,
            message: "User Logged in"
          });
        } else {
          return callback(null, {
            status: true,
            route: "admin",
            success: success,
            message: "Admin Logged in"
          });
        }
      });
    }
  );
};

module.exports = loginModel;