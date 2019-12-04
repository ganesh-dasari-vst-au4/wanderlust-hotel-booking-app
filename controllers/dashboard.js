const dashboardRoute = {};
const Model = require("./../models/Dashboard");

dashboardRoute.retreive = function(request, response) {
  var userId = request.session.user._id;
  var email = request.session.user.email;
  Model.retreive(userId, email, function(error, success) {
    if (error) {
      return response.json(error);
    } else {
      if (request.session.user === undefined) {
        return response.render("dashboard", {
          account: success.account,
          items: success.history,
          nav: "Signup/Login",
          link: "/signup"
        });
      } else {
        return response.render("dashboard", {
          account: success.account,
          items: success.history,
          nav: "Logout",
          link: "/logout"
        });
      }
    }
  });
};

module.exports = dashboardRoute;
