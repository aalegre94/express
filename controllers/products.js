//array donde se guardan los productos
const products = [];

// /admin/add-product => GET
exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};
// /admin/add-product => POST
exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};
// / => GET
exports.getProducts = (req, res, next) => {
  res.render("shop", { pageTitle: "Shop", path: "/", productos: products });
};
