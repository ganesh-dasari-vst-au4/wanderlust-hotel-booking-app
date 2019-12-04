const Contact = {};
const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority';

Contact.query = function (name, email, comment, callback) {
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
    var collection = database.collection("queries");

    var data = {
      name: name,
      email: email,
      comment: comment
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



module.exports = Contact;