const Product = require("../models/product");
// /admin/add-product => GET
exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};
// /admin/products => GET
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/productos", {
      pageTitle: "Admin Productos",
      path: "/admin/products",
      productos: products,
    });
  });
};

// /admin/add-product => POST
exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};
