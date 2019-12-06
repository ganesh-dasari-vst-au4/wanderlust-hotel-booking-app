const profile = {};
const Model = require("./../models/Profile");

profile.upload = function(request, response) {
  var id = request.query.id;
  var image = request.file.path;

  Model.upload(id, image, function(error, success) {
    if (error) {
      return response.send(error);
    } else {
      return response.redirect("/dashboard");
    }
  });
};

module.exports = profile;
