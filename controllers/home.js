const homeController = {};
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority";
homeController.all = function(request, response) {
  MongoClient.connect(url, function(error, client) {
    var database = client.db("aloha");
    var all = database.collection("hotels");
    all.find().toArray(function(error, success) {
      if (error) {
        response.status(200).send(error);
      } else {
        if (request.session.user === undefined) {
          return response.render("home", {
            hotels: success,
            nav: "Signup/Login",
            link: "/signup"
          });
        } else {
          return response.render("home", {
            hotels: success,
            nav: "Logout",
            link: "/logout"
          });
        }
      }
    });
  });
};
module.exports = homeController;
