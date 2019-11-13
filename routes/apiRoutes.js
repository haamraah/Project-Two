var db = require("../models");
// var Workorder = require('../models/workorder');

module.exports = function (app) {

  // work order routes
  app.get("/api/workorder", function (req, res) {
    db.Workorder.findAll({}).then(function (workOrder) {
      res.json(workOrder);
    });
  });

  // Create a new workorder
  app.post("/api/workorder", function (req, res) {
    //   var data = {
    //     creationDate: "10/10/1997",
    //     clientName: "Shiyu",
    //     clientPhone: 123456,
    //     clientAddress: "550N 5AV, AZ",
    //     jobAddress: "879E 7Th, Az",
    //     installerName: "Bruce",
    //     materials: "Light",
    //     isComplete: "Pending",
    //     comments: "Hello World!",
    // };

    // var {creationDate, clientName, clientPhone, clientAddress, jobAddress, installerName, materials, isComplete, comments} = data;
    // Insert into table.
    db.Workorder.create(req.body).then(() => res.redirect('/dashboard') )
      .catch(err => console.log(err))
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
      })
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