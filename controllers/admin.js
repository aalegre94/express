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
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

// /admin/edit-product => GET
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  res.render("admin/editar-producto", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
  });
};
