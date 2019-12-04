const searchController = {};
const Model = require("./../models/SearchHotels");
searchController.hotelResults = function(request, response) {
  var cityName = request.body.destination;
  var cityQuery = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  // console.log(cityName, cityQuery);
  Model.hotelResults(cityQuery, function(error, success) {
    if (error) {
      response.status(500).send(error);
    } else {
      console.log(success.result);
      if (request.session.user === undefined) {
        return response.render("results", {
          data: success.result,
          cityName: cityName,
          nav: "Signup/Login",
          link: "/signup"
        });
      } else {
        return response.render("results", {
          data: success.result,
          cityName: cityName,
          nav: "Logout",
          link: "/logout"
        });
      }
    }
  });
};

module.exports = searchController;
