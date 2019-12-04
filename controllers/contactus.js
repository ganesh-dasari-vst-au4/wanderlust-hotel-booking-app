const contact = {};
const Model = require("./../models/Contactus");

contact.query = function (request, response) {
  var name = request.body.name;
  var email = request.body.email;
  var comment = request.body.comment;

  Model.query(name, email, comment, function (error, success) {
    if (error) {
      response.send(error);
    } else {
      response.send(success.data);
    }
  });
};

module.exports = contact;