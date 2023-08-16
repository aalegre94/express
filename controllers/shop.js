const Product = require("../models/product");

// / => GET
exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      path: "/",
      productos: products,
    });
  });
};
// /products => GET
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/lista-de-productos", {
      pageTitle: "Productos",
      path: "/products",
      productos: products,
    });
  });
};
// /products/:productID => GET
exports.getProduct = (req, res, next) => {
  const proId = req.params.productId;
  Product.findById(proId, (product) => {
    console.log(product);
  });
  res.redirect("/");
};
// /cart => GET
exports.getCart = (req, res, next) => {
  res.render("shop/carro", { pageTitle: "Carrito", path: "/cart" });
};
// /orders => GET
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Ordenes", path: "/orders" });
};
// /checkout => GET
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};
