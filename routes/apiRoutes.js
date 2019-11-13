const db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/dashboard/add", function(req, res) {
    const data = {
      creationDate = "10/10/1997",
      clientNmae = "Shiyu",
      clientPhone = 123456,
      clientAddress = "550N 5AV, AZ",
      jobAddress = "879E 7Th, Az",
      installerName = "Bruce",
      materials = "Light",
      isComplete = "Pending",
      comments = "Hello World!",
    };

    // let { creationDate, clientName, clientPhone, clientAddress, jobAddress, installerName, materials, isComplete, comments} = req.body;
    // Insert into table
    db.create({
      creationDate,
      clientName,
      clientPhone,
      clientAddress,
      jobAddress,
      installerName,
      materials,
      isComplete,
      comments
    }).then(job => res.redirect('/dashboard'))
      .catch(err => console.log(err))
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
