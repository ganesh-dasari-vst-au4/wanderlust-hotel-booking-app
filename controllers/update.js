const updateController = {};
const Model = require("./../models/Update");

updateController.edit = function(request, response) {
  var id = request.session.user._id;
  var name = request.body.name;
  var email = request.body.email;
  var phoneNumber = request.body.phoneNumber;
  var password = request.body.password;

  Model.edit(id, name, email, phoneNumber, password, function(error, success) {
    if (error) {
      response.status(500).send(error);
    } else {
      user = success.user[0];
      request.session.user = user;
      return response.redirect("/dashboard");
    }
  });
};
module.exports = updateController;
