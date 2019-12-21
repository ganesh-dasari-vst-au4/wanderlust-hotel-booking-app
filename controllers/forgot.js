const forgotController = {};
const Model = require("./../models/Forgot");

forgotController.search = function(request, response) {
  var email = request.body.email;

  Model.search(email, function(error, success) {
    if (error) {
      return response.render("signup", {
        nav: "Signup/Login",
        link: "/signup",
        error: "The email you entered doesn't match any account."
      });
    } else {
      if (request.session.user === undefined) {
        return response.render("changePassword", {
          nav: "Signup/Login",
          link: "/signup",
          success: success.success[0]
        });
      } else {
        return response.render("changePassword", {
          nav: "Logout",
          link: "/logout",
          success: success.success[0]
        });
      }
    }
  });
};

module.exports = forgotController;
