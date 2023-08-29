const Sequelize = require("sequelize");
// const sequelize = require("../util/database_dev");
const sequelize = require("../util/database_prod");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
module.exports = Cart;
