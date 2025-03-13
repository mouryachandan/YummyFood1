const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Food = sequelize.define("Food", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  restaurantName: {   // ✅ Restaurant Name field add kiya
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Food;
