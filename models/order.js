const Sequelize = require("sequelize");
// const sequelize = require("../util/database_dev");
const sequelize = require("../util/database_prod");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = Order;
