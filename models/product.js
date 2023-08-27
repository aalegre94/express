// const db = require("../util/database_dev.js");
const db = require("../util/database_prod.js");
const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  update() {
    return db.execute(
      "UPDATE products SET title =?, price =?, imageUrl =?, description =? WHERE id =?",
      [this.title, this.price, this.imageUrl, this.description, this.id]
    );
  }

  static deleteById(id) {
    return db.execute("DELETE FROM products WHERE id =?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id =?", [id]);
  }
};
