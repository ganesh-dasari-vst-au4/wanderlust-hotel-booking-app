const profile = {};
const Model = require("./../models/Profile");

profile.upload = function(request, response) {
  var id = request.session.user._id;
  var image = request.file.path;

  Model.upload(id, image, function(error, success) {
    if (error) {
      return response.send(error);
    } else {
      return response.redirect("/dashboard");
    }
  });
};

profile.remove = function(request, response) {
  var id = request.session.user._id;

  Model.remove(id, function(error, success) {
    if (error) {
      return response.send(error);
    } else {
      return response.redirect("/dashboard");
    }
  });
};

module.exports = profile;
