var db = require("../models");

module.exports = function(app) {
  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // work order routes
  app.get("/api/workorder", function(req, res) {
    db.Workorder.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new workorder
  app.post("/api/workorder", function(req, res) {
    db.Workorder.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  app.put("/api/workorder/:id", function(req, res) {
    db.Workorder.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(rowsUpdated) {
      res.json(rowsUpdated);
    });
  });

  // Delete an workorder by id
  app.delete("/api/workorder/:id", function(req, res) {
    db.Workorder.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // test //
  // app.get("/api/users", function (req, res) {
  //   db.User.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);

  //   });
  // });

  // Warehouse routes

  app.get("/api/warehouse", function(req, res) {
    db.Warehouse.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new warehouse
  app.post("/api/warehouse", function(req, res) {
    db.Warehouse.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  app.put("/api/warehouse/:id", function(req, res) {
    db.Warehouse.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(rowsUpdated) {
      res.json(rowsUpdated);
    });
  });
  // Delete an warehouse by id
  app.delete("/api/warehouse/:id", function(req, res) {
    db.Warehouse.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
