const dashboardModel = {};
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority";

dashboardModel.retreive = function(userId, email, callback) {
  var historyArray = [];
  var accountDetails = [];
  MongoClient.connect(
    url,
    {
      useUnifiedTopology: true
    },
    function(error, client) {
      var historyQuery = {
        userId: userId
      };
      var accountsQuery = {
        email: email
      };

      if (error) {
        throw error;
      }
      var database = client.db("aloha");
      var historyCollection = database.collection("history").find(historyQuery);
      var accountCollection = database.collection("accounts");
      historyCollection.forEach(function(doc, err) {
        if (err) {
          throw err;
        }
        historyArray.push(doc);
      });

      accountCollection.find(accountsQuery).toArray(function(error, success) {
        if (error) {
          throw error;
        }

        accountDetails = [success[0]];
        console.log("Accounts>>>>", accountDetails);
        return callback(null, {
          status: true,
          account: accountDetails,
          history: historyArray
        });
      });
    }
  );
};

module.exports = dashboardModel;
