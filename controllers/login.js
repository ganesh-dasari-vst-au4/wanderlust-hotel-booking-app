const loginController = {};
const Model = require("./../models/Login");

loginController.login = function(request, response) {
  var email = request.body.email;
  var password = request.body.password;
  var user = null;
  Model.login(email, password, function(error, success) {
    if (error) {
      return response.render("invalid", {
        error: "The username or password you entered is incorrect."
      });
    }
    user = success.success[0];

    request.session.user = user;

    if (success.route === "home") {
      return response.redirect("/");
    } else {
      return response.redirect("/admin");
    }
  });
};

loginController.logout = function(request, response) {
  var session = request.session;
  session.destroy();
  response.clearCookie("connect.sid");
  return response.render("logout", {
    status: true,
    message: "logged-out.",
    nav: "Signup/Login",
    link: "/signup"
  });
};

// Only authentication is occuring..
loginController.checkIfLoggedIn = function(request, response, next) {
  if (request.url === "/") {
    return next();
  }
  if (request.url === "/signup") {
    return next();
  }
  if (request.url === "/login") {
    return next();
  }
  if (request.url === "/results") {
    return next();
  }
  if (request.url === "/team") {
    return next();
  }
  if (request.url === "/preview") {
    return next();
  }
  if (request.url === "/invalid") {
    return next();
  }
  if (request.url === "/contactus") {
    return next();
  }

  if (request.url === "/aboutus") {
    return next();
  }
  if (request.url === "/complaint") {
    return next();
  }

  if (request.session.user === undefined) {
    return response.render("signup", {
      status: false,
      message: "Login first",
      nav: "Signup/Login",
      link: "/signup"
    });
  } else {
    return next();
  }
};

module.exports = loginController;
