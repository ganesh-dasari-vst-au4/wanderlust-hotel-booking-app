const Booking = {};
const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority';
var ObjectID = require('mongodb').ObjectID

Booking.get = function (id, callback) {

  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function (error, client) {
    if (error) {
      throw error;
    }
    var database = client.db('aloha');
    var query = {
      _id: ObjectID(id)
    }
    var hotelSearch = database.collection('hotels');
    hotelSearch.find(query).toArray(function (error, success) {
      if (error) {
        return callback({
          status: false,
          message: 'we dont serve in this city currently'
        })

      } else {
        result = success[0];
        return callback(null, {
          status: true,
          message: "Success",
          result: result
        });
      }
    })
  })
}


module.exports = Booking;