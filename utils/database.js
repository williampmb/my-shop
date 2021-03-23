const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("myshop", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
