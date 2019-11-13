var db = require("../models");

module.exports = function (app) {
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
  app.get("/api/workorder", function (req, res) {
    db.Workorder.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });
  app.get("/api/workorder", function (req, res) {
    db.Workorder.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });
  app.get("/api/workorder/:installerName/:status/:installationDate/:clientName/:jobAddress/:id", function (req, res) {

    var _installerName = req.params.installerName;
    var _status = req.params.status;
    var _installationDate = req.params.installationDate;
    var _clientName = req.params.clientName;
    var _jobAddress = req.params.jobAddress;
    var _id = req.params.status;

    db.Workorder.findAll({
      where: {

        installerName: _installerName,
        status: _status,
        installationDate: _installationDate,
        clientName: _clientName,
        jobAddress: _jobAddress,
        id: _id
      }
    }).then(function (searchResult) {
      res.json(searchResult);
    });
  });
  // Create a new workorder
  app.post("/api/workorder", function (req, res) {
    db.Workorder.create(req.body).then(function (dbExample) {
      res.redirect("/dashboard");
    });
  });
  app.put("/api/workorder/:id", function (req, res) {

    db.Workorder.update(
      req.body, {
        where: {
          id: req.params.id
        }
      }
    )
      .then(function (rowsUpdated) {
        res.json(rowsUpdated);
      });

  });

  // Delete an workorder by id
  app.delete("/api/workorder/:id", function (req, res) {
    db.Workorder.destroy({
      where: {


        id: req.params.id
      }
    }).then(function (dbExample) {
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

  app.get("/api/warehouse", function (req, res) {
    db.Warehouse.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);

    });
  });

  // Create a new warehouse
  app.post("/api/warehouse", function (req, res) {
    db.Warehouse.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });
  app.put("/api/warehouse/:id", function (req, res) {

    db.Warehouse.update(
      req.body, {
        where: {
          id: req.params.id
        }
      }



    )
      .then(function (rowsUpdated) {
        res.json(rowsUpdated);
      });

  });
  // Delete an warehouse by id
  app.delete("/api/warehouse/:id", function (req, res) {
    db.Warehouse.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

};