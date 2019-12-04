const bookingController = {};
const Model = require("./../models/BookingDetails");

bookingController.insert = function(request, response) {
  var hotelId = request.body.hotelId;
  var userId = request.session.user._id;
  var userName = request.session.user.name;
  var hotelName = request.body.hotelName;
  var hotelAddress = request.body.hotelAddress;
  var hotelCity = request.body.hotelCity;
  var hotelPhone = request.body.hotelPhone;
  var hotelPrice = request.body.hotelPrice;
  var guestQuantity = request.body.guestQuantity;
  var roomQuantity = request.body.roomQuantity;
  var checkIn = request.body.checkIn;
  var checkOut = request.body.checkOut;
  Model.insert(
    hotelId,
    userId,
    userName,
    hotelName,
    hotelAddress,
    hotelCity,
    hotelPhone,
    hotelPrice,
    guestQuantity,
    roomQuantity,
    checkIn,
    checkOut,
    function(error, success) {
      console.log(success.result);
      if (error) {
        return response.send("error");
      } else {
        return response.redirect("/confirm");
      }
    }
  );
};

module.exports = bookingController;
