const complaintController = {};
const Model = require("./../models/Complaint");

complaintController.complaint = function (request, response) {
  var name = request.body.name;
  var email = request.body.email;
  var textArea = request.body.textArea;

  Model.complaint(name, email, textArea, function (error, success) {
    if (error) {
      response.send(error);
    } else {
      response.send(success.data);
    }
  });
};

complaintController.showComplains = function (request, response) {
  var user = request.session.user.email;
  if (user === "ganesh@gmail.com") {
    Model.showComplains(function (error, success) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.render("admin", {
          complain: success.complain,
          feedback: success.feedback,
          user: user,
          nav: "Logout",
          link: "/logout"
        });
      }
    });
  } else {
    return window.stop();
  }
};

module.exports = complaintController;