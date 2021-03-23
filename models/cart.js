const { Sequilize, DataTypes } = require("sequelize");

const sequilize = require("../utils/database");

const Cart = sequilize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
