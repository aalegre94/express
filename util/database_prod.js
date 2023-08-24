const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "tiendaNode",
  port: 3306,
  user: "root",
  database: "db",
  password: "password",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
  connection.release(); // Importante: liberar la conexión después de la verificación
});

module.exports = pool.promise();
