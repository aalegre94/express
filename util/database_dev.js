const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://fisiangel14:OyvDLd6YT5pO1sva@cluster0.iryua9e.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("DB conected");
      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!!!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
