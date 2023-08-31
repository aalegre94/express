const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://fisiangel14:OyvDLd6YT5pO1sva@cluster0.iryua9e.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("DB conected");
      callback(client);
    })
    .catch((error) => {
      console.log(error);
    });
};

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("db", "root", "root", {
//   dialect: "mysql",
//   host: "localhost",
//   port: 3306,
// });

module.exports = mongoConnect;
