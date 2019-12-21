const updatePasswordController = {};
const Model = require("./../models/UpdatePassword");

updatePasswordController.update = function(request, response) {
  var email = request.body.email;

  var password = request.body.password;
  console.log(email, password);

  Model.update(email, password, function(error, success) {
    if (error) {
      response.status(500).send(error);
    } else {
      console.log(success);
      if (request.session.user === undefined) {
        return response.render("signup", {
          nav: "Signup/Login",
          link: "/signup",
          passwordChanged: "Password successfully updated"
        });
      } else {
        return response.render("signup", {
          nav: "Logout",
          link: "/logout",
          passwordChanged: "Password successfully updated"
        });
      }
    }
  });
};
module.exports = updatePasswordController;
