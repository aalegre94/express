const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "tiendaNode",
  port: 3306,
  user: "root",
  database: "db",
  password: "password",
});

module.exports = pool.promise();
