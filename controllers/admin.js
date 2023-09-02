const mongodb = require("mongodb");
const Product = require("../models/product");

const ObjectId = mongodb.ObjectId;

// /admin/add-product => GET
exports.getAddProduct = (req, res, next) => {
  res.render("admin/editar-producto", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
// /admin/products => GET
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/productos", {
        pageTitle: "Admin Productos",
        path: "/admin/products",
        productos: products,
      });
    })
    .catch((err) => console.error(err));
};
// /admin/add-product => POST
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, imageUrl, description);
  product
    .save()
    .then((resultado) => {
      console.log("Product creado");
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
};
// /admin/edit-product/:productID?edit=true => GET
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const proId = req.params.productId;
  // console.log(`id - $(proId)`);}
  Product.findOne(proId)
    .then((products) => {
      const product = products;
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/editar-producto", {
        pageTitle: `Edit Product - ${product.title}`,
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
// /admin/edit-product/:productID?edit=true => POST
exports.postEditProduct = (req, res, next) => {
  const proId = req.body.id;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateImageUrl = req.body.imageUrl;
  const updateDescription = req.body.description;

  const product = new Product(
    updateTitle,
    updatePrice,
    updateImageUrl,
    updateDescription,
    new ObjectId(proId)
  );

  product
    .save()
    .then((resultado) => {
      console.log("Producto actualizado");
      res.redirect("/admin/products");
    })
    .catch((err) => console.error);
};
// /admin/delete-product/ => POST
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.delete(prodId)
    .then(() => {
      console.log("Producto eliminado");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
