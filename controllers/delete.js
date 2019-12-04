const deleteRoute = {};

const Model = require("./../models/Delete");

deleteRoute.cancelBooking = function(request, response) {
  var id = request.query.id;
  console.log(id);
  Model.cancelBooking(id, function(error, success) {
    if (error) {
      console.log(error);
      return response.send(error);
    } else {
      console.log(success);
      return response.redirect("/dashboard");
    }
  });
};
module.exports = deleteRoute;
