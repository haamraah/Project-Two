module.exports = function(sequelize, DataTypes) {
  var Warehouse = sequelize.define("Warehouse", {
    // name of material
    materialName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },

    // color/style of material
    materialStyle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },

    // quantity of material
    materialQuantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    // price of material
    materialPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Warehouse;
};
