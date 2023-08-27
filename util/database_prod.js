const Sequelize = require("sequelize");
const sequelize = new Sequelize("db", "root", "root", {
  dialect: "mysql",
  host: "dbnode",
  port: 3306,
});

module.exports = sequelize;

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "dbnode",
//   port: 3306,
//   user: "root",
//   database: "db",
//   password: "root",
// });

// module.exports = pool.promise();
