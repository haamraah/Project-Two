var db = require("../models");

module.exports = function (app) {

  // middleware function to check for logged-in users
  var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
      res.redirect("/dashboard");
    } else {
      next();
    }
  };

  // route for Home-Page
  app.get("/", sessionChecker, (req, res) => {
    res.redirect("/login");
  });
 

  // route for user signup
  app.route("/signup")
    .get((req, res) => {
      res.sendFile(process.cwd() + "/public/signup.html");
    })
    .post((req, res) => {
      db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin:req.body.isAdmin
      })
        .then(user => {
          req.session.user = user.dataValues;
          res.redirect("/login");
        })
        .catch(error => {
          res.redirect("/signup");
        });
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
      let _user = req.session.user;
      console.log(_user);
      db.Workorder.findAll()
        .then(workOrders =>
          res.render("dashboard", {
            orders: workOrders,
            user: _user
          }))
        .catch(err => console.log(err))
    } else {
      res.redirect("/login");
    }
  });

  // route for warehouse management
  app.get("/warehouse", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      let _user = req.session.user.username;
      db.Warehouse.findAll()
        .then(materials =>
          res.render("warehouse", {
            inventory: materials,
            user: _user
          }))
        .catch(err => console.log(err))
    } else {
      res.redirect("/login");
    }
  });

  // route for user logout
  app.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });

  // route for handling 404 requests(unavailable routes)
  app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
  });

};
