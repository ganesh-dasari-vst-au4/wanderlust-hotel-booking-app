const booking = {};

const Model = require("./../models/Booking");
booking.get = function(request, response) {
  var id = request.query.id;
  console.log(id);
  Model.get(id, function(error, success) {
    if (error) {
      return response.json(error);
    } else {
      if (request.session.user === undefined) {
        return response.render("booking", {
          data: success.result,
          nav: "Signup/Login",
          link: "/signup"
        });
      } else {
        return response.render("booking", {
          data: success.result,
          nav: "Logout",
          link: "/logout"
        });
      }
    }
  });
};
module.exports = booking;
