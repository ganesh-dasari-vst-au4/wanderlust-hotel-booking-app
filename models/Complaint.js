const Complaint = {};
const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority';

Complaint.complaint = function (name, email, textArea, callback) {
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function (
    error,
    client
  ) {
    if (error) {
      throw error;
    }
    var database = client.db("aloha");
    var collection = database.collection("complaints");

    var data = {
      name: name,
      email: email,
      textArea: textArea
    };
    collection.insertOne(data, function (error, data) {
      if (error) {
        return callback(error);
      } else {
        //console.log("data inserted");
        return callback(null, data);
      }
    });
  });
};

Complaint.showComplains = function (callback) {
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function (
    error,
    client
  ) {
    var queriesArray;
    var complainArray;
    if (error) {
      throw error;
    }
    var database = client.db("aloha");
    var queriesCollection = database.collection("queries");
    queriesCollection.find({}).toArray(function (error, data) {
      if (error) {
        return callback({
          status: false,
          message: "Failed to load complains!!!"
        });
      } else {
        queriesArray = data;
      }
    });

    var accountCollection = database.collection("complaints");

    accountCollection.find({}).toArray(function (error, data) {
      if (error) {
        return callback({
          status: false,
          message: "Failed to load complains!!!"
        });
      } else {
        complainArray = data;
        return callback(null, {
          status: true,
          complain: complainArray,
          feedback: queriesArray
        });
      }
    });
  });
};

module.exports = Complaint;