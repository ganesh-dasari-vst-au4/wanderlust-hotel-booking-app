const preview = {};
const Model = require("./../models/Preview");

preview.show = function(request, response) {
  var id = request.query.id;

  Model.show(id, function(error, success) {
    // console.log(responseults)
    if (error) {
      return response.json(error);
    } else {
      if (request.session.user === undefined) {
        return response.render("preview", {
          data: success.result,
          hotels: success.hotels,
          nav: "Signup/Login",
          link: "/signup"
        });
      } else {
        return response.render("preview", {
          data: success.result,
          hotels: success.hotels,
          nav: "Logout",
          link: "/logout"
        });
      }
    }
  });
};
module.exports = preview;
