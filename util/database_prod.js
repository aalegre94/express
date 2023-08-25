const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "dbnode",
  port: 3306,
  user: "root",
  database: "db",
  password: "root",
});

async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("Connected to MySQL database!");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
}

testDatabaseConnection();

module.exports = pool.promise();
