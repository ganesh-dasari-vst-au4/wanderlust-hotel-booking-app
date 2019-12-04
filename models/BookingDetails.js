const bookingDetailsModel = {};
const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority';

bookingDetailsModel.insert = function (
  hotelId,
  userId,
  userName,
  name,
  address,
  city,
  phone,
  price,
  guests,
  rooms,
  checkIn,
  checkOut,
  callback
) {
  MongoClient.connect(
    url, {
      useUnifiedTopology: true
    },
    function (error, client) {
      if (error) {
        throw error;
      }
      var database = client.db("aloha");
      var bookingDetails = database.collection("history");
      var data = {
        hotelId: hotelId,
        userId: userId,
        userName: userName,
        name: name,
        address: address,
        city: city,
        phone: phone,
        price: price,
        guests: guests,
        rooms: rooms,
        checkIn: checkIn,
        checkOut: checkOut
      };
      bookingDetails.insertOne(data, function (error, success) {
        if (error) {
          return callback({
            status: false
          });
        } else {
          return callback(null, {
            status: true,
            result: data
          });
        }
      });
    }
  );
};
module.exports = bookingDetailsModel;