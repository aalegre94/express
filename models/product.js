// const sequelize = require("../util/database_dev");
const getDb = require("../util/database_dev").getDb;

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
