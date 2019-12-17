const express = require("express");
var exphbs = require("express-handlebars");
const session = require("express-session");
var multer = require("multer");
const app = express();

const PORT = process.env.PORT || 9090;

//multer config
var filestorage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/uploads/");
  },
  filename: function(req, file, cb) {
    console.log(file);
    var filename = new Date().getTime() + file.originalname;
    return cb(null, filename);
  }
});

var upload = multer({
  storage: filestorage
});

app.use(express.json());
app.use(express.urlencoded());
app.use("/public", express.static("public"));

//sesion initailisation (Settings object for the session ID cookie)
app.use(
  session({
    secret: "qwerty12345",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 3600000,
      path: "/",
      sameSite: true,
      secure: false
    }
  })
);

//Handlebar configuration
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");
const hbs = exphbs.create({
  extname: ".hbs",
  helpers: {
    toThree: function(index, options) {
      var ret = "</div>";

      if (index % 4 == 0) {
        return options.fn(ret);
      }
    }
  }
});
app.engine(".hbs", hbs.engine);

//import controllers
var booking = require("./controllers/booking"); //directing to booking
var search = require("./controllers/searchHotels"); //directing to seacrhHotels
var preview = require("./controllers/preview"); //directing to preview
var loginRoute = require("./controllers/login.js"); //directing to authentication
var dashboard = require("./controllers/dashboard"); //directing to dashboard
var signupRoute = require("./controllers/signup"); //directing for signup
var bookingDetails = require("./controllers/bookingDetails"); //for inserting booking details to Db
var complaintRoute = require("./controllers/complaint"); // directing for clientComplaint
var profileRoute = require("./controllers/profile"); // directing for profile

var contactRoute = require("./controllers/contactus");
var viewRoute = require("./controllers/view");
var confirmRoute = require("./controllers/confirm");
var deleteRoute = require("./controllers/delete");
var homeController = require("./controllers/home");
var updateRoute = require("./controllers/update");
//middlewares
app.use(loginRoute.checkIfLoggedIn); // middleware for authentication

//routes

app.get("/", homeController.all);
app.get("/signup", function(request, response) {
  if (request.session.user === undefined) {
    return response.render("signup", {
      nav: "Signup/Login",
      link: "/signup"
    });
  } else {
    return response.render("signup", {
      nav: "Logout",
      link: "/logout"
    });
  }
});

app.post("/signup", signupRoute.signup);

app.post("/profile", upload.single("avatar"), profileRoute.upload);

app.get("/profile", profileRoute.remove);

app.post("/login", loginRoute.login);

app.get("/logout", loginRoute.logout);

app.post("/results", search.hotelResults);

app.get("/dashboard", dashboard.retreive);

app.get("/delete", deleteRoute.cancelBooking);

app.get("/update", function(request, response) {
  return response.render("update", {
    nav: "Logout",
    link: "/logout"
  });
});

app.post("/update", updateRoute.edit);

app.get("/invalid", function(request, response) {
  if (request.session.user === undefined) {
    return response.render("invalid", {
      nav: "Signup/Login",
      link: "/signup"
    });
  }
});

app.get("/contactus", function(request, response) {
  if (request.session.user === undefined) {
    return response.render("contactus", {
      nav: "Signup/Login",
      link: "/signup"
    });
  } else {
    return response.render("contactus", {
      nav: "Logout",
      link: "/logout"
    });
  }
});

app.post("/contactus", contactRoute.query);

app.get("/aboutus", function(request, response) {
  if (request.session.user === undefined) {
    return response.render("aboutus", {
      nav: "Signup/Login",
      link: "/signup"
    });
  } else {
    return response.render("aboutus", {
      nav: "Logout",
      link: "/logout"
    });
  }
});
app.get("/complaint", function(request, response) {
  if (request.session.user === undefined) {
    return response.render("complaintClient", {
      nav: "Signup/Login",
      link: "/signup"
    });
  } else {
    return response.render("complaintClient", {
      nav: "Logout",
      link: "/logout"
    });
  }
});
app.get("/team", function(request, response) {
  if (request.session.user === undefined) {
    return response.render("team", {
      nav: "Signup/Login",
      link: "/signup"
    });
  } else {
    return response.render("team", {
      nav: "Logout",
      link: "/logout"
    });
  }
});
app.get("/confirm", confirmRoute.book);
app.get("/view", viewRoute.show);
app.post("/complaint", complaintRoute.complaint);
app.get("/admin", complaintRoute.showComplains);
app.get("/preview", preview.show);
app.get("/booking", booking.get);
app.post("/bookingDetails", bookingDetails.insert);

//listening port

app
  .listen(PORT, function() {
    console.log("Application has started and running on port: ", PORT);
  })
  .on("error", function(error) {
    console.log("Unable to start app. Error >>>>", error);
  });
