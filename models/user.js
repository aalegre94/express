const Sequelize = require("sequelize");
const sequelize = require("../util/database_dev");
// const sequelize = require("../util/database_prod");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: sequelize.STRING,
  email: sequelize.STRING,
});

module.exports = User;
