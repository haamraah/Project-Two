var db = require("../models");

module.exports = function(app) {
  // work order routes
  app.get("/api/workorder", function(req, res) {
    db.Workorder.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  // Create a new workorder
  app.post("/api/workorder", function(req, res) {
    db.Workorder.create(req.body).then((order) => {
      // res.json(order);
      res.redirect("/dashboard")});
  });

  // Get order by id
  app.get("/api/workorder/:id", function(req, res) {
    console.log("ID: "+req.params.id, db.Workorder.id);
    db.Workorder.findAll(req.body, {
      where: {
        clientName: req.params.id
      }
    }).then(function(order) {
      res.json(order);
    });
  });

  // Update workorder
  app.put("/api/workorder/:id", function(req, res) {
    console.log("ID: "+req.params.id);
    db.Workorder.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(rowsUpdated) {
      res.redirect("/dashboard");
    });
  });

  // Delete a workorder by id
  app.delete("/api/workorder/:id", function(req, res) {
    db.Workorder.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Warehouse routes

  app.get("/api/warehouse", function(req, res) {
    db.Warehouse.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new material in warehouse
  app.post("/api/warehouse", function(req, res) {
    db.Warehouse.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Update material in warehouse
  app.put("/api/warehouse/:id", function(req, res) {
    db.Warehouse.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(rowsUpdated) {
      res.json(rowsUpdated);
    });
  });

  // Delete a material by id
  app.delete("/api/warehouse/:id", function(req, res) {
    db.Warehouse.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/api/dashboard", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      let _user = req.session.user;
      console.log(_user);
      db.Workorder.findAll()
        .then(workOrders =>
          res.json({
            orders: workOrders,
            user: _user
          }))
        .catch(err => console.log(err))
    } else {
      res.redirect("/login");
    }
  });
};


