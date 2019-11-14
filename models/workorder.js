var moment = require("moment");

module.exports = function(sequelize, DataTypes) {
  var Workorder = sequelize.define("Workorder", {
    // date of installation
    installationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      get: function() {
        return moment.utc(this.getDataValue("installationDate")).format("YYYY-MM-DD");
      },
      validate: {
        len: [1]
      }
    },

    // name of client
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },

    // client's phone number
    clientPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    // client's address
    clientAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },

    // job location address
    jobAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },

    // name of installer to which workorder is assigned
    installerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },

    // Not quite sure how to include a list of materials, possibly an array??
    materials: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    // status of the workorder, either "pending" or "completes"
    isComplete: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending"
    },

    // any additional instructions/comments
    comments: {
      type: DataTypes.TEXT,
      validate: {
        len: [1]
      }
    }
  });
  return Workorder;
};
