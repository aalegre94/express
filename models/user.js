const mongodb = require("mongodb");
const getDb = require("../util/database_dev").getDb;

const ObjectID = mongodb.ObjectId;

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {})
      .catch((err) => {
        console.error(err);
      });
  }
  static findOne(id) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new ObjectID(id) })
      .next()
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = User;
