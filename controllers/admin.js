const Product = require("../models/product");
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
  Product.findAll()
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
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((resultado) => {
      // console.log(resultado);
      console.log("Product creado");
    })
    .catch((err) => {
      console.error(err);
    });
};

// /admin/edit-product/:productID?edit=true => GET
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const proId = req.params.productId;
  Product.findById(proId)
    .then(([product]) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/editar-producto", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product[0],
      });
    })
    .catch((err) => console.error);
};

exports.postEditProduct = (req, res, next) => {
  const proId = req.body.id;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateImageUrl = req.body.imageUrl;
  const updateDescription = req.body.description;
  const updateProduct = new Product(
    proId,
    updateTitle,
    updateImageUrl,
    updateDescription,
    updatePrice
  );
  updateProduct.update();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(error));
};
