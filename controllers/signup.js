const signupController = {};
const Model = require("./../models/Signup");

signupController.signup = function(request, response) {
  var name = request.body.name;
  var email = request.body.email;
  var phoneNumber = request.body.phoneNumber;
  var password = request.body.password;

  Model.signup(name, email, phoneNumber, password, function(error, success) {
    if (error) {
      return response.render("invalid", { error: error });
    } else {
      if (request.session.user === undefined) {
        return response.render("signup", {
          status: true,
          message: "Succusfully sign up is completed.",
          nav: "Signup/Login",
          link: "/signup"
        });
      } else {
        return response.render("signup", {
          status: true,
          message: "Succusfully sign up is completed.",
          nav: "Logout",
          link: "/logout"
        });
      }
    }
  });
};

module.exports = signupController;
