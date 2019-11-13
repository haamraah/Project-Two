var db = require("../models");

<<<<<<< HEAD
module.exports = function(app) {
=======
module.exports = function (app) {


>>>>>>> 2ac13a8920c82a1a25bb552e27ee1a2fca7bffb7
  // middleware function to check for logged-in users
  var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
      res.redirect("/dashboard");
<<<<<<< HEAD
=======


>>>>>>> 2ac13a8920c82a1a25bb552e27ee1a2fca7bffb7
    } else {
      next();
    }
  };

  // route for Home-Page
  app.get("/", sessionChecker, (req, res) => {
    res.redirect("/login");
  });
<<<<<<< HEAD

  // route for user signup
  app
    .route("/signup")
=======
 

  // route for user signup
  app.route("/signup")
>>>>>>> 2ac13a8920c82a1a25bb552e27ee1a2fca7bffb7
    .get(sessionChecker, (req, res) => {
      res.sendFile(process.cwd() + "/public/signup.html");
    })
    .post((req, res) => {
      db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
<<<<<<< HEAD
        isAdmin: req.body.isAdmin
=======
        isAdmin:req.body.isAdmin
>>>>>>> 2ac13a8920c82a1a25bb552e27ee1a2fca7bffb7
      })
        .then(user => {
          req.session.user = user.dataValues;
          res.redirect("/dashboard");
        })
        .catch(error => {
          res.redirect("/signup");
        });
<<<<<<< HEAD
    });

  // route for user Login
  app
    .route("/login")
    .get(sessionChecker, (req, res) => {
      res.sendFile(process.cwd() + "/public/login.html");
    })
    .post((req, res) => {
      var username = req.body.username,
        password = req.body.password;

      db.User.findOne({
        where: {
          username: username
        }
      }).then(function(user) {
        if (!user) {
          res.redirect("/login");
        } else if (!user.validPassword(password)) {
          res.redirect("/login");
        } else {
          req.session.user = user.dataValues;
          res.redirect("/dashboard");
        }
      });
    });

  // route for user's dashboard
  app.get("/dashboard", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      let _userName = {
        name: JSON.stringify(req.session.user.username)
      };
      res.render("dashboard", {
        userName: _userName
      });
      // res.sendFile(process.cwd() + '/public/dashboard.html');
    } else {
      res.redirect("/login");
    }
  });
=======
    });


  // route for user Login
  app.route("/login")
    .get(sessionChecker, (req, res) => {
      res.sendFile(process.cwd() + "/public/login.html");
    })
    .post((req, res) => {
      var username = req.body.username,
        password = req.body.password;

      db.User.findOne({
        where: {
          username: username
        }
      }).then(function (user) {
        if (!user) {
          res.redirect("/login");
        } else if (!user.validPassword(password)) {
          res.redirect("/login");
        } else {
          req.session.user = user.dataValues;
          res.redirect("/dashboard");

        }
      });
    });


  // route for user's dashboard
  app.get("/dashboard", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      let _userName = {
        name: JSON.stringify(req.session.user)
      };
      res.render("dashboard", {
        userName:_userName
      });
      // res.sendFile(process.cwd() + '/public/dashboard.html');
    } else {
      res.redirect("/login");
    }
  });

>>>>>>> 2ac13a8920c82a1a25bb552e27ee1a2fca7bffb7

  // route for user logout
  app.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });

<<<<<<< HEAD
  // route for handling 404 requests(unavailable routes)
  app.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!");
  });
=======

  // route for handling 404 requests(unavailable routes)
  app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
  });



>>>>>>> 2ac13a8920c82a1a25bb552e27ee1a2fca7bffb7
};
