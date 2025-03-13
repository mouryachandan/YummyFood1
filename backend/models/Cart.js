const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Food = require("./Food");

const Cart = sequelize.define("Cart", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  foodId: { type: DataTypes.INTEGER, allowNull: false },
});

Cart.belongsTo(Food, { foreignKey: "foodId", as: "Food" });
Food.hasMany(Cart, { foreignKey: "foodId" });

module.exports = Cart;
