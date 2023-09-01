// const sequelize = require("../util/database_dev");
const getDb = require("../util/database_dev").getDb;

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }
  save() {}
}
