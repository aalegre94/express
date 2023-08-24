const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "tiendaNode",
  user: "root",
  database: "db",
  password: "password",
});

module.exports = pool.promise();
