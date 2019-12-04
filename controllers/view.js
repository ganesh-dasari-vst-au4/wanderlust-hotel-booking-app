const viewRoute = {};

const Model = require("./../models/View");

viewRoute.show = function(request, response) {
  var id = request.query.id;
  console.log(id);
  Model.show(id, function(error, success) {
    if (error) {
      console.log(error);
      return response.send(error);
    } else {
      console.log(success);
      return response.render("view", {
        result: success.result,
        nav: "Logout",
        link: "/logout"
      });
    }
  });
};
module.exports = viewRoute;
