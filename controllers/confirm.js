const confirmController = {};
const Model = require("./../models/Confirm");

confirmController.book = function(request, response) {
  var userId = request.session.user._id;
  Model.book(userId, function(error, success) {
    if (error) {
      response.status(500).send(error);
    } else {
      response.render("confirm", {
        result: success.result,
        nav: "Logout",
        link: "/logout"
      });
    }
  });
};

module.exports = confirmController;
